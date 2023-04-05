import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "./entities/profile.entity";
import { Repository } from "typeorm";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) {}

  async create(profileData: CreateProfileDto): Promise<Profile> {
    const profile = new Profile();
    Object.assign(profile, profileData);
    return await this.profileRepository.save(profile);
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileRepository.find();
  }

  async findOne(id: number): Promise<Profile> {
    return await this.profileRepository.findOne({ where: { id } });
  }

  async update(id: number, profileData: UpdateProfileDto): Promise<void> {
    await this.checkUser(id);
    await this.profileRepository.update(id, profileData);
  }

  async remove(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }

  private async checkUser(id: number): Promise<boolean> {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('Пользователь не найден.', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}
