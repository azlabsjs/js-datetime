# Input formats to support

## Hours minutes seconds

H HH	0..23	Hours (24 hour time)
h hh	1..12	Hours (12 hour time used with a A.)
k kk	1..24	Hours (24 hour time from 1 to 24)
a A	am pm	Post or ante meridiem (Note the one character a p are also considered valid)
m mm	0..59	Minutes
s ss	0..59	Seconds
S SS SSS ... SSSSSSSSS	0..999999999	Fractional seconds
Z ZZ	+12:00	Offset from UTC as +-HH:mm, +-HHmm, or Z

## Year month day

YYYY	2014	4 or 2 digit year. Note: Only 4 digit can be parsed on strict mode
YY	14	2 digit year
Y	-25	Year with any number of digits and sign
Q	1..4	Quarter of year. Sets month to first month in quarter.
M MM	1..12	Month number
MMM MMMM	Jan..December	Month name in locale set by moment.locale()
D DD	1..31	Day of month
Do	1st..31st	Day of month with ordinal
DDD DDDD	1..365	Day of year
X	1410715640.579	Unix timestamp
x	1410715640579	Unix ms timestamp


## Local Aware

Input	Example	Description
L	09/04/1986	Date (in local format)
LL	September 4 1986	Month name, day of month, year
LLL	September 4 1986 8:30 PM	Month name, day of month, year, time
LLLL	Thursday, September 4 1986 8:30 PM	Day of week, month name, day of month, year, time
LT	8:30 PM	Time (without seconds)
LTS	8:30:00 PM	Time (with seconds)