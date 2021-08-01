import { ApiProperty } from "@nestjs/swagger"


export class CreateInviteLinkOutputDto {
    @ApiProperty({ example: 'http://localhost:7000/groups/useInvite/KLjl234lk20$jlaljk222k34234kjlkj', description: 'disposable invite link' })
    readonly inviteLink: string;
}