import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "./entities/profile.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) {
  }

  async create(profileData: Partial<Profile>): Promise<Profile> {
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

  async update(id: number, profileData: Partial<Profile>): Promise<void> {
    await this.profileRepository.update(id, profileData);
  }

  async remove(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }
}
