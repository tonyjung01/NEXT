import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { User } from '../users/user.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
    
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 사용자 프로필 생성
  async createUserProfile(userId: number, createUserProfileDto: CreateUserProfileDto): Promise<UserProfile> {
    // 사용자 ID로 User 엔티티 조회
    console.log('Received userId:', userId);
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    // user 객체 확인
    console.log('Retrieved User:', user);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 직접 UserProfile 객체 생성 및 값 할당
    const userProfile = new UserProfile();
    userProfile.bio = createUserProfileDto.bio;
    userProfile.avatarUrl = createUserProfileDto.avatarUrl;
    userProfile.user = user;  // User 객체 전체를 할당하여 관계 설정

    console.log('UserProfile before saving:', userProfile);

    // UserProfile을 데이터베이스에 저장
    return this.userProfileRepository.save(userProfile);
  }

  // 특정 사용자 프로필 조회
  async getUserProfile(userId: number): Promise<UserProfile> {
    console.log('Getting UserProfile for userId:', userId);

    const profile = await this.userProfileRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'], // User와의 관계 포함
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    console.log('Retrieved UserProfile:', profile);
    return profile;
  }

  // 사용자 프로필 업데이트
  async updateUserProfile(userId: number, updateUserProfileDto: UpdateUserProfileDto): Promise<UserProfile> {
    console.log('Updating UserProfile for userId:', userId);

    const profile = await this.getUserProfile(userId);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    // DTO에서 전달된 속성들만 업데이트
    Object.assign(profile, updateUserProfileDto);

    console.log('UserProfile after updating:', profile);

    return this.userProfileRepository.save(profile);
  }
}
