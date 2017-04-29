# README

## Example

### Mac OS X + Passenger + Apache

/private/etc/apache2/other/kanban.conf

...
LoadModule passenger_module /usr/local/opt/passenger/libexec/buildout/apache2/mod_passenger.so
<IfModule mod_passenger.c>
  PassengerRoot /usr/local/opt/passenger/libexec/src/ruby_supportlib/phusion_passenger/locations.ini
  PassengerDefaultRuby /usr/local/bin/ruby
</IfModule>

<VirtualHost *>
  RailsEnv production
  DocumentRoot /Users/user/kanban/public
  <Directory /Users/user/kanban/public>
    Require all granted
  </Directory>
</VirtualHost>
...