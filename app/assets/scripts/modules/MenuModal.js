import $ from 'jquery';

class MenuModal {
	constructor() {
		this.menuButton = $('.menu__button');
		this.menuContent = $('.menu__content');
		this.contactEmail = $('.menu__content__contact__email');
		this.contactPhoneNumber = $('.menu__content__contact__phone-number');
		this.events();
	}
	
	events() {
		this.menuButton.click(this.toggleTheMenu.bind(this));
		this.menuButton.click(this.populateContact());
		this.menuContent.click(this.closeTheMenu.bind(this));
	}
	
	toggleTheMenu() {
		this.menuContent.toggleClass('menu__content--is-visible');
		this.menuButton.toggleClass('menu__button--close-x');
		
	}
	
	closeTheMenu() {
		this.menuContent.removeClass('menu__content--is-visible');
		this.menuButton.removeClass('menu__button--close-x');
	}
	
	populateContact() {
		this.contactEmail.html('mike'+'builds'+'websites'+'@'+'gmail'+'.co'+'m');
		this.contactEmail.attr('href','mailto:mikebuildswebsites@gmail.com');
		this.contactPhoneNumber.html('0'+'7'+'8'+'5'+'8'+'7'+'5'+'0'+'2'+'3'+'8');
		this.contactPhoneNumber.attr('href', 'tel:+44 7858750238');
	}
}

export default MenuModal;