var menu_account; //现有（父）菜单数
var menu_id_number; //（父）菜单id
var sub_menu_id_number; //子菜单id
var wechatName;

var obj; //存放data.json里的数据
$(function() {
	$.ajax({
		type: "get",
		url: "data.json",
		success: function(item) {
			obj = eval(item);
			menu_account = obj.Dmenu_account;
			menu_id_number = obj.Dmenu_id_number;
			sub_menu_id_number = obj.Dsub_menu_id_number;
			wechatName = obj.name;
		}
	});
})

//没有添加过菜单（菜单为0）时的首页
$(function() {
	$('.menu_setting_page').hide();
});

$(function() {
	//首页点击添加菜单进入setting页
	$('.btn_for_add_menu').click(function() {
		$('#sort_disabled').show();
		$('#sort').hide();
		$('.munu_preview_head').text(wechatName); //微信名
		menu_account++;
		menu_id_number++;
		$('.menu_initial_page').hide();
		$('.menu_setting_page').show();
		$('.only_menu_name').hide();
		$('.not_only_menu_name').show();
		//没有添加过菜单时进入menu_setting后的默认显示
		$('#menu_item_add_size1').hide();
		$('#menu_item_add_size2').show();
		$('#menu_item_add_size3').hide();
		$('.sub_menu_display').show();
		$('#menu_item_MR').clone(true).attr('id', 'menu_item_' + menu_id_number).insertBefore($('#menu_item_add_size2'));
		$('#' + 'menu_item_' + menu_id_number).css('display', 'list-item');
		$('#' + 'menu_item_' + menu_id_number).addClass('menu_item_size2');
		$('.sub_menu_item_sizeall').removeClass('current');
		$('#' + 'menu_item_' + menu_id_number).addClass('current select');
		$('#' + 'menu_item_' + menu_id_number + " .menu_item span").text('父菜单-' + menu_id_number); //注意选择器中的空格

		size2_click_menu_text_change();

		$('#Button2').unbind('click').click(function() {
			$(".dialog").hide();
        	$(".mask").hide();
			menu_account--;
			$('.menu_item_sizeall.current').remove();
			$('#menu_item_add_size1').show();
			$('#menu_item_add_size2').hide();
			$('#menu_item_add_size3').hide();
		})

	})
});

//判断字数
var jmz = {};
jmz.GetLength = function(str) {
	var realLength = 0,
		len = str.length,
		charCode = -1;
	for(var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if(charCode >= 0 && charCode <= 128) realLength += 1; //字母算一个字符
		else realLength += 2; //汉字算两个字符
	}
	return realLength;
};

function click_submenu_text_change() {
	$('.menu_name1').text('子菜单名称');
	$('.menu_title_label').text('子菜单名称');
	$('.tips2_for_menu_title').text('请输入子菜单名称');
	$('.edit_box_square_title a').text('删除子菜单');
	$('.tips1_for_menu_title').text("字数不超过8个汉字或16个字母");

	$('.tips1_for_menu_title').show();
	$('.tips2_for_menu_title').hide();
	$('.tips3_for_menu_title').hide();

	$('input[id="input_menu_name2"]').val($('.sub_menu_item_sizeall.current a .p-style').text());
	$('.menu_name1').text($('.sub_menu_item_sizeall.current a .p-style').text());

	$('input[id="input_menu_name2"]').unbind('change').change(function(e) {
		var str = $('input[id="input_menu_name2"]').val();
		$('.menu_name1').text(str);
		$('.sub_menu_list li[class="sub_menu_item_sizeall current"] a .p-style').text(str);

		if(jmz.GetLength(str) == 0) {
			$('.menu_name1').text("子菜单名称");
			$('.sub_menu_item_sizeall.current a .p-style').text("子菜单名称");
			$('.tips2_for_menu_title').show();
			$('.tips3_for_menu_title').hide();
		} else if(jmz.GetLength(str) > 0 && jmz.GetLength(str) <= 16) {
			$('.tips2_for_menu_title').hide();
			$('.tips3_for_menu_title').hide();
		} else if(jmz.GetLength(str) > 16) {
			$('.menu_name1').text("子菜单名称");
			$('.sub_menu_item_sizeall.current a .p-style').text("子菜单名称");
			$('.tips2_for_menu_title').hide();
			$('.tips3_for_menu_title').show();
		}
	})

}

function size2_click_menu_text_change() {
	$('.menu_name1').text('菜单名称');
	$('.menu_title_label').text('菜单名称');
	$('.tips2_for_menu_title').text('请输入菜单名称');
	$('.edit_box_square_title a').text('删除菜单');
	$('.tips1_for_menu_title').text("字数不超过4个汉字或8个字母");

	$('.tips1_for_menu_title').show();
	$('.tips2_for_menu_title').hide();
	$('.tips3_for_menu_title').hide();

	$('input[id="input_menu_name1"]').val($('.menu_item_size2.current.select>a>span').text());
	$('input[id="input_menu_name2"]').val($('.menu_item_size2.current.select>a>span').text());
	$('.menu_name1').text($('.menu_item_size2.current.select>a>span').text());

	$('input[id="input_menu_name1"]').change(function() {
		var str = $('input[id="input_menu_name1"]').val();
		$('.menu_name1').text(str);
		$('.menu_item_size2.current.select>a>span').text(str);

		if(jmz.GetLength(str) == 0) {
			$('.menu_name1').text("菜单名称");
			$('.menu_item_size2.current.select>a>span').text("菜单名称");
			$('.tips2_for_menu_title').show();
			$('.tips3_for_menu_title').hide();
		} else if(jmz.GetLength(str) > 0 && jmz.GetLength(str) <= 8) {
			$('.tips2_for_menu_title').hide();
			$('.tips3_for_menu_title').hide();
		} else if(jmz.GetLength(str) > 8) {
			$('.menu_name1').text("菜单名称");
			$('.menu_item_size2.current.select>a>span').text("菜单名称");
			$('.tips2_for_menu_title').hide();
			$('.tips3_for_menu_title').show();
		}
	})

	$('input[id="input_menu_name2"]').change(function() {
		var str = $('input[id="input_menu_name2"]').val();
		$('.menu_name1').text(str);
		$('.menu_item_size2.current.select>a>span').text(str);
		if(jmz.GetLength(str) == 0) {
			$('.menu_name1').text("菜单名称");
			$('.menu_item_size2.current.select>a>span').text("菜单名称");
			$('.tips2_for_menu_title').show();
			$('.tips3_for_menu_title').hide();
		} else if(jmz.GetLength(str) > 0 && jmz.GetLength(str) <= 8) {
			$('.tips2_for_menu_title').hide();
			$('.tips3_for_menu_title').hide();
		} else if(jmz.GetLength(str) > 8) {
			$('.menu_name1').text("菜单名称");
			$('.menu_item_size2.current.select>a>span').text("菜单名称");
			$('.tips2_for_menu_title').hide();
			$('.tips3_for_menu_title').show();
		}
	})

}

function size3_click_menu_text_change() {
	$('.menu_name1').text('菜单名称');
	$('.menu_title_label').text('菜单名称');
	$('.tips2_for_menu_title').text('请输入菜单名称');
	$('.edit_box_square_title a').text('删除菜单');
	$('.tips1_for_menu_title').text("字数不超过4个汉字或8个字母");

	$('.tips1_for_menu_title').show();
	$('.tips2_for_menu_title').hide();
	$('.tips3_for_menu_title').hide();

	$('input[id="input_menu_name1"]').val($('.menu_item_size3.current.select>a>span').text());
	$('input[id="input_menu_name2"]').val($('.menu_item_size3.current.select>a>span').text());
	$('.menu_name1').text($('.menu_item_size3.current.select>a>span').text());

	$('input[id="input_menu_name1"]').change(function() {
		var str = $('input[id="input_menu_name1"]').val();
		$('.menu_name1').text(str);
		$('.menu_item_size3.current.select>a>span').text(str);
		if(jmz.GetLength(str) == 0) {
			$('.menu_name1').text("菜单名称");
			$('.menu_item_size3.current.select>a>span').text("菜单名称");
			$('.tips2_for_menu_title').show();
			$('.tips3_for_menu_title').hide();
		} else if(jmz.GetLength(str) > 0 && jmz.GetLength(str) <= 8) {
			$('.tips2_for_menu_title').hide();
			$('.tips3_for_menu_title').hide();
		} else if(jmz.GetLength(str) > 8) {
			$('.menu_name1').text("菜单名称");
			$('.menu_item_size3.current.select>a>span').text("菜单名称");
			$('.tips2_for_menu_title').hide();
			$('.tips3_for_menu_title').show();
		}
	})

	$('input[id="input_menu_name2"]').change(function() {
		var str = $('input[id="input_menu_name2"]').val();
		$('.menu_name1').text(str);
		$('.menu_item_size3.current.select>a>span').text(str);

		if(jmz.GetLength(str) == 0) {
			$('.menu_name1').text("菜单名称");
			$('.menu_item_size3.current.select>a>span').text("菜单名称");
			$('.tips2_for_menu_title').show();
			$('.tips3_for_menu_title').hide();
		} else if(jmz.GetLength(str) > 0 && jmz.GetLength(str) <= 8) {
			$('.tips2_for_menu_title').hide();
			$('.tips3_for_menu_title').hide();
		} else if(jmz.GetLength(str) > 8) {
			$('.menu_name1').text("菜单名称");
			$('.menu_item_size3.current.select>a>span').text("菜单名称");
			$('.tips2_for_menu_title').hide();
			$('.tips3_for_menu_title').show();
		}
	})

}

//点击size1的"+"添加第一个菜单项时变成size为2
$(function() {
	$('#menu_item_add_size1').click(function() {
		menu_account++;
		if(menu_account > 1) {
			$('#sort_disabled').hide();
			$('#sort').show();
			$('#sort_finished').hide();
		} else {
			$('#sort_disabled').show();
			$('#sort').hide();
			$('#sort_finished').hide();
		}
		menu_id_number++;
		$('#menu_item_add_size1').hide();
		$('#menu_item_add_size2').show();
		$('#menu_item_add_size3').hide();
		$('.sub_menu_display').show();
		$('#menu_item_MR').clone(true).attr('id', 'menu_item_' + menu_id_number).insertBefore($('#menu_item_add_size2'));
		$('#' + 'menu_item_' + menu_id_number).css('display', 'list-item');
		$('#' + 'menu_item_' + menu_id_number).addClass('menu_item_size2');
		$('.sub_menu_item_sizeall').removeClass('current');
		$('#' + 'menu_item_' + menu_id_number).addClass('current select');
		$('#' + 'menu_item_' + menu_id_number + " .menu_item span").text('父菜单-' + menu_id_number); //注意选择器中的空格

		$('#Button2').unbind('click').click(function() {
			$(".dialog").hide();
        	$(".mask").hide();
			menu_account--;
			if(menu_account > 1) {
				$('#sort_disabled').hide();
				$('#sort').show();
				$('#sort_finished').hide();
			} else {
				$('#sort_disabled').show();
				$('#sort').hide();
				$('#sort_finished').hide();
			}
			$('.menu_item_sizeall.current').remove();
			$('#menu_item_add_size1').show();
			$('#menu_item_add_size2').hide();
			$('#menu_item_add_size3').hide();
		})

	})
})

//点击size2的"+"添加第二个菜单项时变成size为3
$(function() {
	$('#menu_item_add_size2').click(function(e) {
		menu_account++;
		if(menu_account > 1) {
			$('#sort_disabled').hide();
			$('#sort').show();
			$('#sort_finished').hide();
		} else {
			$('#sort_disabled').show();
			$('#sort').hide();
			$('#sort_finished').hide();
		}
		menu_id_number++;
		//		$('.menu_item_sizeall').css('width', '33.33%');
		$('.menu_item_sizeall').removeClass('menu_item_size2').addClass('menu_item_size3');
		$('.menu_item_sizeall').removeClass('current select');
		$('.sub_menu_display').hide();
		$('#menu_item_add_size3').show();
		$('#menu_item_add_size2').hide();
		$('#menu_item_MR').clone(true).attr('id', 'menu_item_' + menu_id_number).insertBefore($('#menu_item_add_size2'));
		$('#' + 'menu_item_' + menu_id_number).css('display', 'list-item');
		$('#' + 'menu_item_' + menu_id_number + ' .sub_menu_display').show();
		$('#' + 'menu_item_' + menu_id_number).addClass('menu_item_size3');
		$('.sub_menu_item_sizeall').removeClass('current');
		$('#' + 'menu_item_' + menu_id_number).addClass('current select');
		$('#' + 'menu_item_' + menu_id_number + " .menu_item span").text('父菜单-' + menu_id_number); //注意选择器中的空格

		size3_click_menu_text_change();

		$('#Button2').unbind('click').click(function() {
			$(".dialog").hide();
        	$(".mask").hide();
			menu_account--;
			if(menu_account > 1) {
				$('#sort_disabled').hide();
				$('#sort').show();
				$('#sort_finished').hide();
			} else {
				$('#sort_disabled').show();
				$('#sort').hide();
				$('#sort_finished').hide();
			}
			$('.menu_item_sizeall').removeClass('menu_item_size1').removeClass('menu_item_size3').addClass('menu_item_size2');
			$('.menu_item_sizeall.current').remove();
			$('#menu_item_add_size1').hide();
			$('#menu_item_add_size2').show();
			$('#menu_item_add_size3').hide();
		})

		e.stopPropagation();

	})
});

//添加第三个菜单项时隐藏"+"项，显示第三个菜单项
$(function() {
	$('#menu_item_add_size3').click(function() {
		menu_account++;
		if(menu_account > 1) {
			$('#sort_disabled').hide();
			$('#sort').show();
			$('#sort_finished').hide();
		} else {
			$('#sort_disabled').show();
			$('#sort').hide();
			$('#sort_finished').hide();
		}
		menu_id_number++;

		$('.menu_item_sizeall').removeClass('current select');
		$('.sub_menu_display').hide();
		$('#menu_item_add_size3').hide();
		$('#menu_item_add_size2').hide();
		$('#menu_item_add_size1').hide();
		$('#menu_item_MR').clone(true).attr('id', 'menu_item_' + menu_id_number).insertBefore($('#menu_item_add_size2'));
		$('#' + 'menu_item_' + menu_id_number).css('display', 'list-item');
		$('#' + 'menu_item_' + menu_id_number + ' .sub_menu_display').show();
		$('#' + 'menu_item_' + menu_id_number).addClass('menu_item_size3');
		$('.sub_menu_item_sizeall').removeClass('current');
		$('#' + 'menu_item_' + menu_id_number).addClass('current select');
		$('#' + 'menu_item_' + menu_id_number + " .menu_item span").text('父菜单-' + menu_id_number); //注意选择器中的空格

		size3_click_menu_text_change();

		$('#Button2').unbind('click').click(function() {
			$(".dialog").hide();
        	$(".mask").hide();
			menu_account--;
			if(menu_account > 1) {
				$('#sort_disabled').hide();
				$('#sort').show();
				$('#sort_finished').hide();
			} else {
				$('#sort_disabled').show();
				$('#sort').hide();
				$('#sort_finished').hide();
			}
			$('.menu_item_sizeall').removeClass('menu_item_size1').removeClass('menu_item_size2').addClass('menu_item_size3');
			$('.menu_item_sizeall.current').remove();
			$('#menu_item_add_size1').hide();
			$('#menu_item_add_size2').hide();
			$('#menu_item_add_size3').show();
		})

	})
});


//鼠标点击某个（父）菜单项时
function clickMenu() {
	$('.sub_menu_item_sizeall').removeClass('current');
	$('.sub_menu_display').hide();
	$('.menu_item_sizeall').removeClass('current select');
	$(this).addClass('current select');
	if(($('.menu_item_sizeall.current .sub_menu_list>li').length - 2) > 0) {
		$('.menu_item_sizeall.current').find('.sub_menu_small_icon').css('display', 'inline-block');
	} else {
		$('.menu_item_sizeall.current').find('.sub_menu_small_icon').css('display', 'none');
	}
	$('.menu_item_sizeall.current .sub_menu_display').show();

	if(($('.menu_item_sizeall.current .sub_menu_list>li').length - 2) > 0) {
		$('.only_menu_name').show();
		$('.not_only_menu_name').hide();
	} else if(($('.menu_item_sizeall.current .sub_menu_list>li').length - 2) == 0) {
		$('.only_menu_name').hide();
		$('.not_only_menu_name').show();
	}

	if($(this).hasClass('menu_item_size2')) {
		size2_click_menu_text_change();
	} else if($(this).hasClass('menu_item_size3')) {
		size3_click_menu_text_change();
	}

	$('#Button2').unbind('click').click(function() {
		$(".dialog").hide();
        $(".mask").hide();
		if(menu_account == 1) {
			menu_account--;
			$('#sort_disabled').show();
			$('#sort').hide();
			$('#sort_finished').hide();
			$('.menu_item_sizeall.current').remove();
			$('#menu_item_add_size1').show();
			$('#menu_item_add_size2').hide();
			$('#menu_item_add_size3').hide();
		} else if(menu_account == 2) {
			menu_account--;
			$('#sort_disabled').show();
			$('#sort').hide();
			$('#sort_finished').hide();
			$('.menu_item_sizeall').removeClass('menu_item_size1').removeClass('menu_item_size3').addClass('menu_item_size2');
			$('.menu_item_sizeall.current').remove();
			$('#menu_item_add_size1').hide();
			$('#menu_item_add_size2').show();
			$('#menu_item_add_size3').hide();
		} else if(menu_account == 3) {
			menu_account--;
			$('#sort_disabled').hide();
			$('#sort').show();
			$('#sort_finished').hide();
			$('.menu_item_sizeall').removeClass('menu_item_size1').removeClass('menu_item_size2').addClass('menu_item_size3');
			$('.menu_item_sizeall.current').remove();
			$('#menu_item_add_size1').hide();
			$('#menu_item_add_size2').hide();
			$('#menu_item_add_size3').show();
		}
	})
}

function sort_clickMenu() {
	$('.sub_menu_display').hide();
	$('.menu_item_sizeall').removeClass('current select');
	$(this).addClass('current');
	$('.menu_item_sizeall.current').find('.sub_menu_small_icon').css('display', 'none');
	$('.menu_item_sizeall.current .sub_menu_display').show();
	if(($('.menu_item_sizeall.current .sub_menu_list>li').length - 2)==0){
		$('.menu_item_sizeall.current').find('.sub_menu_display').css('display','none');
	}
}

//鼠标点击某个（父）菜单项时
$(function() {
	$('.menu_item_sizeall').bind('click', clickMenu);
})

function clickSubMenu(event) {
	$('.menu_item_sizeall.current').removeClass('select');
	$('.sub_menu_item_sizeall').removeClass('current');
	$(this).addClass('current');
	$('.only_menu_name').hide();
	$('.not_only_menu_name').show();

	click_submenu_text_change();

	$('#Button2').unbind('click').click(function() {
		$(".dialog").hide();
        $(".mask").hide();
		$('.sub_menu_item_sizeall.current').remove();
		$('.sub_menu_item_add_box').show();
		if(($('.menu_item_sizeall.current .sub_menu_list>li').length - 2) > 0) {
			$('.menu_item_sizeall.current').find('.sub_menu_small_icon').css('display', 'inline-block');
		} else {
			$('.menu_item_sizeall.current').find('.sub_menu_small_icon').css('display', 'none');
		}
	})
	event.stopPropagation();
}

// 点击"+"添加子菜单 & 点击子菜单时
$(function() {
	//点击“+”添加子菜单
	$('.sub_menu_item_add_box').click(function(e) {
		sub_menu_id_number++;
		var menu_id = $('.menu_item_sizeall.current').attr('id');
		$('.menu_item_sizeall.current.select').removeClass('select');

		if(($('.menu_item_sizeall.current .sub_menu_list>li').length - 1) < 5) {
			$(this).show();
			$('#moren_sub_menu_item').clone(true).attr('id', menu_id + '_sub_menu_item_' + sub_menu_id_number).insertBefore(this);
			$('#' + menu_id + '_sub_menu_item_' + sub_menu_id_number).css('display', 'list-item');
			$('.sub_menu_item_sizeall').removeClass('current');
			$('#' + menu_id + '_sub_menu_item_' + sub_menu_id_number).addClass('current');
			$('#' + menu_id + '_sub_menu_item_' + sub_menu_id_number + " .sub_menu_item .p-style").text('子菜单-' + sub_menu_id_number); //注意选择器中的空格

		} else if(($('.menu_item_sizeall.current .sub_menu_list>li').length - 1) == 5) {
			$('#moren_sub_menu_item').clone(true).attr('id', menu_id + '_sub_menu_item_' + sub_menu_id_number).insertBefore(this);
			$('#' + menu_id + '_sub_menu_item_' + sub_menu_id_number).css('display', 'list-item');
			$('.sub_menu_item_sizeall').removeClass('current');
			$('#' + menu_id + '_sub_menu_item_' + sub_menu_id_number).addClass('current');
			$('#' + menu_id + '_sub_menu_item_' + sub_menu_id_number + " .sub_menu_item .p-style").text('子菜单-' + sub_menu_id_number); //注意选择器中的空格
			$(this).hide();

		}

		if(($('.menu_item_sizeall.current .sub_menu_list>li').length - 2) > 0) {
			$('.menu_item_sizeall.current').find('.sub_menu_small_icon').css('display', 'inline-block');
		} else {
			$('.menu_item_sizeall.current').find('.sub_menu_small_icon').css('display', 'none');
		}

		click_submenu_text_change();

		$('#Button2').unbind('click').click(function() {
			$(".dialog").hide();
        	$(".mask").hide();
			$('.sub_menu_item_sizeall.current').remove();
			$('.sub_menu_item_add_box').show();
			if(($('.menu_item_sizeall.current .sub_menu_list>li').length - 2) > 0) {
				$('.menu_item_sizeall.current').find('.sub_menu_small_icon').css('display', 'inline-block');
			} else {
				$('.menu_item_sizeall.current').find('.sub_menu_small_icon').css('display', 'none');
			}
		})

		e.stopPropagation();

	})
	//点击该菜单的子菜单
	$('.sub_menu_item_sizeall').bind('click', event,clickSubMenu);
});

$(function() {
	//点击“保存并发布”
	$('.btn_group_for_publish').click(function() {
		var x = new Array(); //一维
		var y = new Array(); //二维

		$('.bottom_menu_list>li').not('#menu_item_add_size1').not('#menu_item_add_size2').not('#menu_item_add_size3').each(function(index1, element1) {
			x[index1] = $(element1).children(".menu_item").children("span").text();
			y[index1] = new Array();
			$(element1).find('.sub_menu_display ul>li:not(#moren_sub_menu_item)>a>span>span').each(function(index2, element2) {
				y[index1][index2] = $(element2).text();
			})

		})

		var result = "";
		result += "wechat{" + "\n";
		result += '"wechatName":' + '"' + wechatName + '"' + "\n";
		result += '"menu":' + "[" + "\n";
		$.each(y, function(i) {
			result += '    {' + '"menuName":' + '"' + x[i] + '",' + "\n";
			result += '     "subMenu":' + "[" + "\n";
			$.each(this, function(j) {
				result += '        {' + '"subMenuName":' + this + '},' + "\n";
			});
			result += '     ]' + '\n';
			result += "    }" + "\n";
		});
		result += " ]" + '\n';
		result += "}" + "\n";
		alert(result);
	})
})

function sort_clickSubMenu(event) {
	event.stopPropagation();
}

$(function() {
	$('#sort').bind('click', function() {
		$('#sort_finished').show();
		$('.edit_box').hide();
		$('.tips_for_sort').show();
		$('.menu_item_sizeall').unbind('click');
		$('.menu_item_sizeall').bind('click',sort_clickMenu);
		$('.sub_menu_item_sizeall').unbind('click');
		$('.sub_menu_item_sizeall').bind('click',sort_clickSubMenu);
		if($('.bottom_menu_list>li').length == 5) {
			$('#menu_item_add_size3').hide();
			$('.menu_item_sizeall').removeClass('menu_item_size1').removeClass('menu_item_size3').addClass('menu_item_size2');
		}
		if(($('.menu_item_sizeall.current .sub_menu_list>li').length - 2)==0){
			$('.menu_item_sizeall.current').find('.sub_menu_display').css('display','none');
		}
		$('.sub_menu_item_add_box').hide();

		$('.sort_icon').css('display', 'inline-block');
		$('.sub_menu_small_icon').css('display', 'none');
		$(".menu_preview_body>ul").sortable({
			delay: 2, //为防与点击事件冲突，延时2秒
			opacity: 0.75 //以透明度0.35随意拖动
		})
		$(".sub_menu_display>ul").sortable({
			delay: 2, //为防与点击事件冲突，延时2秒
			opacity: 0.75 //以透明度0.35随意拖动
		})
		$(this).hide();
	})
})

$(function() {
	$('#sort_finished').bind('click', function() {
		$('#sort').show();
		$('.edit_box').show();
		$('.tips_for_sort').hide();
		$('.menu_item_sizeall').bind('click', clickMenu);
		$('.sub_menu_item_sizeall').bind('click',event, clickSubMenu);
		$('.sub_menu_item_add_box').show();
		$('.sort_icon').css('display', 'none');
		$('.sub_menu_small_icon').css('display', 'inline-block');
		if($('.bottom_menu_list>li').length == 5) {
			$('#menu_item_add_size3').show();
			$('.menu_item_sizeall').removeClass('menu_item_size1').removeClass('menu_item_size2').addClass('menu_item_size3');
		}
		$(".menu_preview_body>ul").sortable('destroy');//设置为不可拖拽
		$(".sub_menu_display>ul").sortable('destroy');//设置为不可拖拽
		$(this).hide();	
	})
})

$(function(){
	$('#delete_menu').click(function(){
		$(".mask").show(); //显示背景色
        showDialog(); //设置提示对话框的Top与Left
        $(".dialog").show(); //显示提示对话框
    }) 
    /*
    *根据当前页面与滚动条位置，设置提示对话框的Top与Left
    */
    function showDialog() {
        var objW = $(window); //当前窗口
        var objC = $(".dialog"); //对话框
        var brsW = objW.width();
        var brsH = objW.height();
        var sclL = objW.scrollLeft();
        var sclT = objW.scrollTop();
        var curW = objC.width();
        var curH = objC.height();
        //计算对话框居中时的左边距
        var left = (brsW - curW) / 2;
        //计算对话框居中时的上边距
        var top = (brsH - curH) / 2;
        //设置对话框在页面中的位置
        objC.css({ "left": left, "top": top });
    }

    $(window).resize(function() {//页面窗口大小改变事件
        if (!$(".dialog").is(":visible")) {
            return;
        }
        showDialog(); //设置提示对话框的Top与Left
    });

    $(".pop_closed").click(function() { //注册关闭图片点击事件
        $(".dialog").hide();
        $(".mask").hide();
    })

    $("#Button3").click(function() {//注册取消按钮点击事件
        $(".dialog").hide();
        $(".mask").hide();
    })

})