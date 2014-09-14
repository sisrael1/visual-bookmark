all: bower composer npm

bower: npm
	cd assets; ../node_modules/.bin/bower install

composer: composer.phar
	php ./composer.phar install

composer.phar:
	curl -s https://getcomposer.org/installer | php

npm:
	npm install

.PHONY: bower composer npm