// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Memory
// Controller: ApplicationController
// ==========================================================================
ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function(){

Memory = ig.Game.extend({


    cards: '',

    first: YES,

    firstItem: '',
    secondItem: '',

    moves: 0,
    correct: 0,
    timer: 0,
    font: new ig.Font( 'media/04b03.font.png' ),
	
	
    init: function() {
		
		// bind keys for desktop web
		//ig.input.bind(ig.KEY.SPACE, 'jump');
		//ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		//ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		//ig.input.bind(ig.KEY.F, 'shoot');
		
		//this.loadLevel( LevelTest );
		AppMobi.webview.execute('canvasInit();');
	//        Array.prototype.shuffle = Memory.ApplicationController.arrayShuffle;

        if (isFirstLoad) {

            this.restart();
        }
    },
    update: function() {		
		// screen follows the player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}
		
		// Update all entities and BackgroundMaps
		this.parent();
	},
    loadLevel: function( data ) {
		this.parent( data );
		
		// Enable the pre-rendered mode for all background maps
		for( var i = 0; i < this.backgroundMaps.length; i++ ) {
			this.backgroundMaps[i].chunkSize = 256;
			this.backgroundMaps[i].preRender = true;
		}
	},


    restart: function() {

        this.cards = {};
        this.first = YES;
        this.firstItem = '';
        this.secondItem = '';
        this.moves = 0;
        this.correct = 0;
        this.timer = 60;

        var cards = this.getCards();
        var self = this;
        var len = cards.length;

        //duplicate the array
        for (var i = 0; i < len; i++) {
            cards.push(cards[i]);
        }

        this.set('cards', this.arrayShuffle(cards));

        $('.tmp-dashboard-item img').each(function() {
            $(this).attr('alt', $(this).attr('src'));
            $(this).attr('src', 'theme/images/Icon.png');
        });

        this.timeout = setInterval(function(){
            self.set('timer', self.timer -= 1);
            if(self.timer <= 1){
                clearInterval(self.timeout);
                DialogView.alert({
                    title: 'Game over!',
                    message: 'Time moves on buddy!',
                    confirmButtonValue: 'Play again?.',
                    callbacks: {
                        confirm: {
                            action: function() {
                                self.restart();
                            }
                        }
                    }
                });
            }
        }, 1000);
    },

    itemClicked: function(objId) {
        if ($('#' + objId).hasClass('correct') || !($('#' + objId).hasClass('tmp-dashboard-item'))) {
            return
        }

        if (this.first) {
            this.reset();
//            console.log('first');
            this.set('first', false);
            this.set('firstItem', objId);
            this.show(objId);
        } else if (objId !== this.firstItem) {
            this.show(objId);
            this.set('first', true);
            this.set('secondItem', objId);
            this.check();
        }
    },
    draw: function() {
		// Draw all entities and BackgroundMaps
		this.parent();
		
		if( !ig.ua.mobile || (typeof top != "undefined" && top.location.href.match('^http://localhost:58888')!=null)) {
			this.font.draw( 'Left/Right/Jump: Arrow Keys, F to shoot', 2, 2 );
			show('SplashScreen');
		}
    },
    show: function(objId) {
        $('#' + objId + ' img').attr('src', $('#' + objId + ' img').attr('alt'));
        $('#' + objId + ' img').addClass('active');
        $('#' + objId + ' img').addClass('rotation');
        $('#' + objId).addClass('active');
    },

    check: function() {

        var self = this;
        this.set('moves', this.moves += 1);
        var a = ViewManager.getViewById(this.firstItem).value;
        var b = ViewManager.getViewById(this.secondItem).value;
        if (a == b) {
            $('#' + this.firstItem).addClass('correct');
            $('#' + this.secondItem).addClass('correct');
            this.correct += 1;
            if (this.correct >= this.cards.length / 2) {
                DialogView.alert({
                    title: 'You won!',
                    message: 'And only needed ' + this.moves + ' moves!',
                    confirmButtonValue: 'Play again?.',
                    callbacks: {
                        confirm: {
                            action: function() {
                                self.restart();
                            }
                        }
                    }
                });
            }
        }
        $('.active.correct').animate({
            opacity: 0
        }, 1000, function() {
            $('.active.correct').css('visibility', 'hidden');
        });
    },

    reset: function() {
        $('.active img').each(function() {
            $(this).attr('alt', $(this).attr('src'));
            $(this).attr('src', 'theme/images/Icon.png');
        });
        $('.active').addClass('rotation_back');
        $('.active').removeClass('rotation');
        $('.active').removeClass('active');
        setTimeout(function() {
            $('.rotation_back').removeClass('rotation_back');
        }, 500);
    },

    arrayShuffle: function(array) {
        var tmp, rand;
        for (var i = 0; i < array.length; i++) {
            rand = Math.floor(Math.random() * array.length);
            tmp = array[i];
            array[i] = array[rand];
            array[rand] = tmp;
        }
        var copy = [];

        array.forEach(function(key, a) {
            if (key !== undefined) {
                copy[a] = key;
            }
        });
        return copy;
    },

    getCards: function(){
        return [
//            {
//                icon: 'theme/images/applications.png',
//                label: 'applications',
//                value: 'applications'
//            },
            {
                icon: 'theme/images/chrome-canary.png',
                label: 'chrome-canary',
                value: 'chrome-canary'
            },
            {
                icon: 'theme/images/chrome.png',
                label: 'chrome',
                value: 'chrome'
            },
            {
                icon: 'theme/images/chromiupng',
                label: 'chromium',
                value: 'chromium'
            },
            {
                icon: 'theme/images/dictonary.png',
                label: 'dictonary',
                value: 'dictonary'
            },
//             {
//             icon: 'theme/images/documents.png',
//             label: 'documents',
//             value: 'documents'
//             },
//             {
//             icon: 'theme/images/downloads.png',
//             label: 'downloads',
//             value: 'downloads'
//             },
            {
                icon: 'theme/images/finder.png',
                label: 'finder',
                value: 'finder'
            },
            {
                icon: 'theme/images/ical.png',
                label: 'ical',
                value: 'ical'
            },
            {
                icon: 'theme/images/ios.png',
                label: 'ios',
                value: 'ios'
            },
            {
                icon: 'theme/images/mail.png',
                label: 'mail',
                value: 'mail'
            },
            {
                icon: 'theme/images/opera.png',
                label: 'opera',
                value: 'opera'
            },
//             {
//             icon: 'theme/images/safari.png',
//             label: 'safari',
//             value: 'safari'
//             },
//             {
//             icon: 'theme/images/skype.png',
//             label: 'skype',
//             value: 'skype'
//             },
            {
                icon: 'theme/images/smultron.png',
                label: 'smultron',
                value: 'smultron'
            },
//             {
//             icon: 'theme/images/syspref.png',
//             label: 'systemeinstellungen',
//             value: 'systemeinstellungen'
//             },
//             {
//             icon: 'theme/images/terminal.png',
//             label: 'terminal',
//             value: 'terminal'
//             },
            {
                icon: 'theme/images/trash.png',
                label: 'trash',
                value: 'trash'
            },
            {
                icon: 'theme/images/twitter.png',
                label: 'twitter',
                value: 'twitter'
            }
//             ,
//             {
//             icon: 'theme/images/webstorpng',
//             label: 'webstorm',
//             value: 'webstorm'
//             }

        ];
    }

});
