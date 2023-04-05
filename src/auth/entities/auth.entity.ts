import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../../profile/entities/profile.entity";

@Entity('Auth')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: Role;

  @OneToOne(() => Profile, profile => profile.auth, {onDelete: 'CASCADE'})
  @JoinColumn()
  profile: Profile;
}