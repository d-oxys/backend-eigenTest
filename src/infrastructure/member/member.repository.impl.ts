import * as admin from 'firebase-admin';
import { Member } from '../../domain/member/entity/member';
import { MemberRepository } from '../../domain/member/repository/member.repository';

export class MemberRepositoryImpl implements MemberRepository {
  private db = admin.firestore();

  async findByCode(code: string): Promise<Member | null> {
    const doc = await this.db.collection('members').doc(code).get();
    return doc.exists ? (doc.data() as Member) : null;
  }

  async save(member: Member): Promise<void> {
    const memberData = {
      code: member.code,
      name: member.name,
    };

    await this.db.collection('members').doc(member.code).set(memberData);
  }

  async findLastMember(): Promise<Member | null> {
    const members = await this.db
      .collection('members')
      .orderBy('code', 'desc')
      .limit(1)
      .get();
    return members.empty ? null : (members.docs[0].data() as Member);
  }

  async findAll(): Promise<Member[]> {
    const snapshot = await this.db.collection('members').get();
    return snapshot.docs.map((doc) => doc.data() as Member);
  }
}
