import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @OneToOne(() => User, user => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
