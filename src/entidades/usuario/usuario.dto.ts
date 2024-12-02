import { IsOptional, IsString } from 'class-validator';

// DTO para actualizar el perfil
export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    apellidos?: string;

    @IsOptional()
    @IsString()
    biografia?: string;

    @IsOptional()
    @IsString()
    especializacion?: string;

    @IsOptional()
    @IsString()
    estado?: string;
}
