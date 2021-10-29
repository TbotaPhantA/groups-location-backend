import { Point } from 'geojson';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('point')
  coordinates: Point;
}
