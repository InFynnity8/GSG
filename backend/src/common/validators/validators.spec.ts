import { validateSync } from 'class-validator';
import { IsHref, IsMediaUrl, IsTimeOfDay } from './index';

class Sample {
  @IsMediaUrl() media!: string;
  @IsHref() href!: string;
  @IsTimeOfDay() time!: string;
}

const errorsFor = (values: Partial<Sample>) => {
  const s = Object.assign(new Sample(), {
    media: '/a.jpg',
    href: '/give',
    time: '09:00',
    ...values,
  });
  return validateSync(s).map((e) => e.property);
};

describe('custom validators', () => {
  it('accepts valid values', () => {
    expect(errorsFor({})).toEqual([]);
    expect(errorsFor({ media: 'https://cdn.example.com/x.png' })).toEqual([]);
    expect(errorsFor({ href: 'https://gsg.online.church/' })).toEqual([]);
    expect(errorsFor({ time: '18:30:00' })).toEqual([]);
  });

  it.each(['javascript:alert(1)', 'data:text/html,hi', '//evil.com/x.png'])(
    'rejects dangerous URL %s',
    (url) => {
      expect(errorsFor({ media: url, href: url })).toEqual(['media', 'href']);
    },
  );

  it('rejects invalid times', () => {
    expect(errorsFor({ time: '24:00' })).toEqual(['time']);
    expect(errorsFor({ time: '9am' })).toEqual(['time']);
  });
});
