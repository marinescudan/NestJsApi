import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor( config: ConfigService ) {
        super({
            datasources: {
                db: {
                    // url: process.env.DATABASE_URL,
                    // url: 'postgresql://postgres:123@localhost:5434/nest',
                    url: config.get<string>('DATABASE_URL'),
                },
            }
        });

        // console.log(config);
    }

    public cleanDb() {
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany(),
        ]);
    }
}
