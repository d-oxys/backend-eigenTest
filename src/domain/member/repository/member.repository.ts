import { Member } from '../entity/member';

export interface MemberRepository {
  findByCode(code: string): Promise<Member | null>;
  save(member: Member): Promise<void>;
  findLastMember(): Promise<Member | null>;
  findAll(): Promise<Member[]>;
}
