import amqp from 'amqplib';

export class RabbitmqWrapper {
  // private
  private _url: string;
  private _queueName: string;

  // 재시도 구성
  private _maxRetries: number = 3;
  private _retryDelay: number = 5000; // 5초

  // public
  public channel: any;
  public queue: any;

  constructor(url: string, queueName: string) {
    this._url = url;
    this._queueName = queueName;
  }
  // 커넥트 생성하고 채널 연결
  async setup() {
    const connect = await amqp.connect(this._url); // 메시지 브로커에 연결, 프로토콜로 "amqp" 선택
    const channel = await connect.createChannel();
    this.channel = channel;
  }

  // 채널에다가 queue 만들어주기 queue는 메세지를 수신 받을 수 있는 이름
  async assertQueue() {
    const queue = await this.channel.assertQueue(this._queueName, {
      durable: false, // false는 볼 때까지 보관, true는 일정시간이 지나면 사라짐
    });
    this.queue = queue;
  }

  async handleFailedMessage(message, retryCount = 0) {
    if (retryCount < this._maxRetries) {
      // 실패한 메시지를 처리하는 사용자 정의 로직을 구현합니다. (예: 로깅)
      console.error(`메시지 처리에 실패했습니다: ${message.content.toString()}. 다시 시도 중...`);

      // 재시도 전 지연
      await new Promise((resolve) => setTimeout(resolve, this._retryDelay));

      // 메시지를 다시 큐에 넣어 재시도합니다.
      await this.sendToQueue(message.content.toString());

      // 원래 메시지를 큐에서 제거하기 위해 확인합니다.
      this.channel.ack(message);
    } else {
      // 최대 재시도 횟수를 초과하면 메시지를 영구적으로 실패로 간주합니다.
      console.error(`메시지에 대한 최대 재시도 횟수를 초과했습니다: ${message.content.toString()}.`);
      // 필요한 경우 추가 로직을 구현합니다 (예: 로깅 또는 데드레터 큐로 이동).
      this.channel.ack(message); // 메시지를 큐에서 제거하기 위해 확인합니다.
    }
  }

  // queue에 데이터보내기
  async sendToQueue(msg) {
    const sending = await this.channel.sendToQueue(this._queueName, this.encode(msg), {
      persistent: true,
    });
    return sending;
  }

  // recvFromQueue 함수 수정하여 handleFailedMessage 사용
  async recvFromQueue() {
    const message = await this.channel.get(this._queueName, {});
    if (message) {
      try {
        // 메시지 처리
        console.log(message.content);
        console.log(message.content.toString());
        return message.content.toString();
      } catch (error) {
        // 처리 오류를 처리하고 재시도 또는 실패로 표시합니다.
        await this.handleFailedMessage(message);
        return null;
      }
    } else {
      return null;
    }
  }

  // 문자를 Buffer로 바꿈
  encode(doc) {
    return Buffer.from(JSON.stringify(doc));
  }

  // 메세지보내기
  async send_message(msg) {
    await this.setup(); //레빗엠큐 연결
    await this.assertQueue(); //큐생성
    await this.sendToQueue(msg); //생성큐메세지전달
  }

  // 메세지 가져오기
  async recv_message() {
    await this.setup();
    return await this.recvFromQueue(); // 실패한 메시지에 대해서 어떻게 처리할것인지 고민중
  }
}
