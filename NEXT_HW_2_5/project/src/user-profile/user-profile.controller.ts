import { Controller, Get, Post, Put, Body, UseGuards, Req } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  async createProfile(@Req() req, @Body() createUserProfileDto: CreateUserProfileDto) {
    const userId = req.user.id;  // userId만 추출
    return this.userProfileService.createUserProfile(userId, createUserProfileDto);
  }

  @Get()
  async getProfile(@Req() req) {
    const userId = req.user.id;  // userId만 추출
    return this.userProfileService.getUserProfile(userId);
  }

  @Put()
  async updateProfile(@Req() req, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    const userId = req.user.id;  // userId만 추출
    return this.userProfileService.updateUserProfile(userId, updateUserProfileDto);
  }
}
