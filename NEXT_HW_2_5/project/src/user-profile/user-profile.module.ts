import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './user-profile.entity';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile, User])], // UserProfile와 User 엔티티를 등록
  providers: [UserProfileService],
  controllers: [UserProfileController],
})
export class UserProfileModule {}
