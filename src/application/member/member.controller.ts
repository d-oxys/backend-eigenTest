import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { MemberService } from './member.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Member } from '../../domain/member/entity/member';

@ApiTags('members')
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post(':memberCode/borrow/:bookCode')
  @ApiOperation({ summary: 'Meminjam buku' })
  @ApiResponse({ status: 200, description: 'Buku berhasil dipinjam' })
  @ApiResponse({
    status: 404,
    description: 'Anggota atau buku tidak ditemukan',
  })
  @ApiParam({ name: 'memberCode', type: 'string', description: 'Kode anggota' })
  @ApiParam({ name: 'bookCode', type: 'string', description: 'Kode buku' })
  async borrowBook(
    @Param('memberCode') memberCode: string,
    @Param('bookCode') bookCode: string,
  ) {
    const result = await this.memberService.borrowBook(memberCode, bookCode);
    return { response: result };
  }

  @Post(':memberCode/return/:bookCode')
  @ApiOperation({ summary: 'Mengembalikan buku' })
  @ApiResponse({ status: 200, description: 'Buku berhasil dikembalikan' })
  @ApiResponse({
    status: 404,
    description:
      'Peminjaman tidak ditemukan atau buku tidak dipinjam oleh anggota ini',
  })
  @ApiParam({ name: 'memberCode', type: 'string', description: 'Kode anggota' })
  @ApiParam({ name: 'bookCode', type: 'string', description: 'Kode buku' })
  async returnBook(
    @Param('memberCode') memberCode: string,
    @Param('bookCode') bookCode: string,
  ) {
    const result = await this.memberService.returnBook(memberCode, bookCode);
    return { response: result };
  }

  @Post('add')
  @ApiOperation({ summary: 'Menambahkan anggota baru' })
  @ApiResponse({
    status: 201,
    description: 'Anggota baru berhasil ditambahkan',
  })
  @ApiResponse({ status: 400, description: 'Data anggota tidak valid' })
  @ApiBody({ type: Member, description: 'Data anggota baru' })
  async addMember(@Body() member: Member) {
    const result = await this.memberService.addMember(member);
    return { response: result };
  }

  @Get('check')
  @ApiOperation({
    summary: 'Menampilkan semua anggota dan jumlah buku yang dipinjam',
  })
  @ApiResponse({
    status: 200,
    description: 'Daftar semua anggota dengan jumlah buku yang sedang dipinjam',
    type: [Member],
  })
  async checkMembers() {
    return await this.memberService.checkMembers();
  }
}
