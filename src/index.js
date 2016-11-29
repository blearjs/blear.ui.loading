/**
 * ui loading
 * @author ydr.me
 * @create 2016-04-22 22:47
 */



'use strict';

var UI =        require('blear.ui');
var Mask =      require('blear.ui.mask');
var Window =    require('blear.ui.window');
var Template =  require('blear.classes.template');
var object =    require('blear.utils.object');
var loader =    require('blear.utils.loader');
var fun =       require('blear.utils.function');
var template =  require('./template.html', 'html');
var style =     require('./style.css', 'css');
var gif =       require('./loading.gif', 'file');

var tpl = new Template(template);
var UI_CLASS = UI.UI_CLASS + '-loading';
var gifSize = 30;
var defaults = {
    padding: 15
};
var hasLoading = false;
var Loading = Window.extend({
    className: 'Loading',
    constructor: function (options) {
        var the = this;

        options = object.assign(true, {}, defaults, options);
        var size = gifSize + options.padding * 2;
        Loading.parent(the, {
            width: size,
            height: size,
            topRate: 1 / 2,
            leftRate: 1 / 2
        });

        // init node
        Loading.invike('setHTML', the, tpl.render({gif: gif}));
        the[_mask] = new Mask({
            opacity: 0.3,
            bgColor: 'white'
        });

        // init event
        the.on('beforeOpen', function () {
            the[_mask].zIndex(UI.zIndex());
            the[_mask].open();
            hasLoading = true;
        });

        the.on('afterClose', function () {
            the[_mask].close();
            hasLoading = false;
        });
    },


    /**
     * 销毁实例
     * @param callback
     */
    destroy: function (callback) {
        var the = this;

        callback = fun.noop(callback);
        callback = fun.bind(callback, the);
        Loading.invoke('destroy', the, function () {
            the[_mask].destroy(callback);
        });
    }
});

var _mask = Loading.sole();

document.addEventListener('touchstart', function (ev) {
    if (hasLoading) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
    }
}, true);

style += '.' + UI_CLASS + '-gif{' +
    /**/'background-image:url(' + gif + ');' +
    '}';
// 预加载
loader.img(gif);
coolie.importStyle(style);
Loading.defaults = defaults;
module.exports = Loading;
