import { User } from '../../database/entity/Account';
import { UserProfile } from '../../database/entity/UserProfile';
import { AppDataSource } from '../../config/data-source';
import { IUserProfileService } from '~/@types/api/profile/request';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import transactionRunner from '~/database/transaction';

export const userProfileService = async ({ postalAddress, roadNameAddress, imageUrl, userId }: IUserProfileService) => {
  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOne({ where: { id: userId } });

  if (!foundUser) {
    throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
  }

  // object 스토리지 저장해서 주소값 받아오는 로직 추가

  const UserProfileRepository = AppDataSource.getRepository(UserProfile);
  const userProfile = await UserProfileRepository.findOne({ where: { userId } });

  await transactionRunner(async (queryRunner) => {
    if (userProfile) {
      // If the user profile exists, update it
      userProfile.postalAddress = postalAddress;
      userProfile.roadNameAddress = roadNameAddress;
      userProfile.image = imageUrl;

      await queryRunner.manager.save(userProfile);
    } else {
      // If the user profile doesn't exist, create a new one
      const newUserProfile = UserProfileRepository.create({
        userId,
        postalAddress,
        roadNameAddress,
        image: imageUrl,
      });

      await queryRunner.manager.save(newUserProfile);
    }
  });
};
