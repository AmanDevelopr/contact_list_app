import { getFormattedDate } from '../helpers/helpers';

export const PUBLIC_IMAGE_FOLDER = '/images/';
export const DEFAULT_BANNER_IMAGE = '/banners/default.png';

export const BANNERS = [
  'cloud.jpg',
  'dns-server.png',
  'full-stack-web-development.jpg',
  'js.jpg',
  'load-balancer.png',
];

export const DROPDOWN_OPTIONS = [
  {
    label: 'Football',
    value: 'football',
  },
  {
    label: 'Cricket',
    value: 'cricket',
  },
];

export const FOOTBALL_OPTIONS = [
  {
    label: 'Defender',
    value: 'defender',
  },
  {
    label: 'Striker',
    value: 'striker',
  },
];

export const CRICKET_OPTIONS = [
  {
    label: 'Wicket Keeper',
    value: 'wicket keeper',
  },
  {
    label: 'Batsman',
    value: 'batsman',
  },
  {
    label: 'Bowler',
    value: 'bowler',
  },
  {
    label: 'All Rounder',
    value: 'all rounder',
  },
];

export const Columns = [{
  field: 'name',
  label: 'Name',
  align: 'center',
},
{
  field: 'email',
  label: 'Email Address',
  format: (value) => value && value.toUpperCase(),
},
{
  field: 'phoneNumber',
  label: 'ContactNo.',
  align: 'center',
},
{
  field: 'createdAt',
  label: 'Date',
  align: 'right',
  format: getFormattedDate,
},
];

export const MathResult = ({
  first, second, operator, result,
}) => (
  `When we do ${first} ${operator} ${second} , we get ${result} `
);
