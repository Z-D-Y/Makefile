$(document).ready(function () {

    $("#btnSubmit").click(function () {
        var key = $("#inputSearch").val();
        if (key == "") {
            alert("请输入搜索关键字");
            $("#inputSearch").focus();
            return false;
        }
        $("#inputQ").val('blog:' + username + ' ' + key);
        return true;
    });

    initDigg();
    initArchives();
    initShareButtons();

    function initArchives() {
        var shortlist = '';
        var hidelist = '';
        var list = $("#archive_list");
        list.children().each(function (i) {
            if (i < 5)
                shortlist += "<li>" + $(this).html() + "</li>";
            else
                hidelist += "<li>" + $(this).html() + "</li>";
        });

        if (hidelist == '') return;
        hidelist = '<span class="hidelist" style="display:none;">' + hidelist + '</span>';
        list.html(shortlist + hidelist + '<div id="archive_list_button" class="list_closed">展开</div>');

        $("#archive_list_button").toggle(function () {
            $(this).html("收起");
            $(this).removeClass("list_closed").addClass("list_opended");
            $(".hidelist", list).show();
        }, function () {
            $(this).html("展开");
            $(this).removeClass("list_opended").addClass("list_closed");
            $(".hidelist", list).hide();
        });
    }


    function initShareButtons() {
        var panel = $("#sharePanel");
        if (panel.length == 0) return;
        var url = encodeURIComponent(document.location);
        var title = encodeURIComponent(document.title);
        var shareto = {
            "sina": function () {
                var _u = 'http://v.t.sina.com.cn/share/share.php?url=' + url + '&title=' + title;
                var imgs = $(".article_content img");
                if (imgs.length > 0) {
                    _u += "&pic=" + encodeURIComponent(imgs[0].src);
                }
                openWindow(_u);
            },
            "qq": function () {
                var _site = 'http://blog.csdn.net';
                var _u = 'http://v.t.qq.com/share/share.php?url=' + url + '&site=' + _site + '&title=' + title;
                var imgs = $(".article_content img");
                if (imgs.length > 0) {
                    _u += "&pic=" + encodeURIComponent(imgs[0].src);
                }
                openWindow(_u);
            }
        };

        $("#sharePanel").html('<span>分享到：</span> <a name="sina" class="share_sina" title="分享到新浪微博"></a><a name="qq" class="share_qq" title="分享到腾讯微博"></a>');
        $("#sharePanel a").each(function () {
            var name = $(this).attr("name");
            if (!name) return;
            $(this).click(function () {
                shareto[name]();
                return false;
            });
        });
    }

    function initDigg() {
        var diggdiv = $("#digg");
        if (diggdiv.length > 0) {
            var articleId = diggdiv.attr("ArticleId");
            $("#btnDigg,#btnBury").click(function () {
                var me = $(this);
                var className = me.attr("class").replace("digg digg_", "");
                if (className == "enable") {
                    var id = me.attr("id");
                    var action = id == "btnDigg" ? "digg" : "bury";
                    $.get(blog_address + "/article/" + action + "?ArticleId=" + articleId, function () {
                        $("#btnDigg,#btnBury").unbind("click").removeClass("digg_enable").addClass("digg_disable");
                        var val = parseInt($.trim($("dd", me).html()));
                        val++;
                        $("dd", me).html(val);

                        var digged = [];
                        var tmp = $.cookie("digged");
                        if (tmp) { digged = tmp.split(','); }
                        digged.push(articleId);
                        $.cookie("digged", digged.join());
                    });
                } else {
                    $(this).unbind("click");
                }
            });
        }
    }

    function initBodyHeight() {
        var siderHeight = $("#sider").height();
        var mainHeight = $("#main").height();
        if (siderHeight > mainHeight) {
            $("#body").height(siderHeight);
        }
        else {
            $("#body").height(mainHeight + 100);
        }
    }

});


function collectArticle(title, fileName) {

    openWindow("http://wz.csdn.net/storeit.aspx?t=" + encodeURIComponent(title) + "&u=" + blog_address + "/article/details/" + fileName, title);
}
function untopArticle(articleId) {

    if (!confirm("你确定要取消置顶这篇文章吗？")) return;
    $.get(blog_address + "/article/untop?articleId=" + articleId, function (txt) {
        var data = eval("(" + txt + ")");
        if (data.result) {
            alert("文章已取消置顶！");
            location.reload();
        } else {
            if (data.content)
                alert(data.content);
            else
                alert("无法取消置顶，请到后台操作！");
        }
    });
}
function deleteArticle(articleId) {

	if(!confirm("你确定要删除这篇文章吗？")) return;
	$.get(blog_address + "/article/delete?articleId=" + articleId, function (txt) {
	    var data = eval("(" + txt + ")");
	    if (data.result) {
	        alert("文章已删除！");
	        location.reload();
	    } else {
	        if (data.content)
	            alert(data.content);
	        else
	            alert("无法删除，请到后台删除！");
	    }
	});
}

function openWindow(url, title) {

	var _t = title || encodeURI(document.title);
	var _u = url || encodeURIComponent(document.location);
	var f = function(){
		var left = (screen.width - 600)/2;
		var top = (screen.height - 450)/2;
		if(!window.open(url,'','toolbar=0,resizable=1,scrollbars=yes,status=1,width=600,height=400'))
			location.href = url;
	}
	if(/Firefox/.test(navigator.userAgent)) setTimeout(f,0); else f();
}

function report(id, t, e) {
    //创建遮罩
    $.createMask();
    //加载对话框
    var url = blog_address + "/common/report?id=" + id + "&t=" + t;
    if (t == 3) {
        var floor = e.parentNode.parentNode.parentNode.getAttribute('floor');
        url += "&floor=" + floor;
    }
    var top = (document.documentElement.clientHeight - 400) / 2 + (document.documentElement.scrollTop || document.body.scrollTop);
    var left = (document.documentElement.clientWidth - 400) / 2;
    $("#report_dialog").load(url).css({ "top": top + "px", "left": left }).show();

}

function getCalendar(time) {
    $("#calendar").load(blog_address + "/Article/Calendar?time=" + time + "&.calendar");
    return false;
};
