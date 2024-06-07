import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from '../../domain/member/entity/member';

// Mock MemberService
const mockMemberService = {
  borrowBook: jest.fn(),
  returnBook: jest.fn(),
  addMember: jest.fn(),
};

describe('MemberController', () => {
  let controller: MemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [
        {
          provide: MemberService,
          useValue: mockMemberService,
        },
      ],
    }).compile();

    controller = module.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('borrowBook', () => {
    it('should call MemberService.borrowBook with the correct parameters', async () => {
      const memberCode = 'M0001';
      const bookCode = 'B001';
      await controller.borrowBook(memberCode, bookCode);
      expect(mockMemberService.borrowBook).toHaveBeenCalledWith(
        memberCode,
        bookCode,
      );
    });
  });

  describe('returnBook', () => {
    it('should call MemberService.returnBook with the correct parameters', async () => {
      const memberCode = 'M0001';
      const bookCode = 'B001';
      await controller.returnBook(memberCode, bookCode);
      expect(mockMemberService.returnBook).toHaveBeenCalledWith(
        memberCode,
        bookCode,
      );
    });
  });

  describe('addMember', () => {
    it('should call MemberService.addMember with the correct parameters', async () => {
      const newMember = new Member();
      await controller.addMember(newMember);
      expect(mockMemberService.addMember).toHaveBeenCalledWith(newMember);
    });
  });
});
