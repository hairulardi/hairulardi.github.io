// -------------------------------------------
// Author       : Hairul Ardi
// Author URI   : http://hairulardi.github.io
// -------------------------------------------

$(document).ready(function()
{
    //animasi fixed navbar saat scroll
    function navbarScroll()
    {
        var scroll = $(window).scrollTop();

        (scroll >= 50) ? $(".navbar-default").removeClass("scrollnav") : $(".navbar-default").addClass("scrollnav");
    }

    //efek parallax header
    function parallax()
    {
        if($(window).innerWidth() >= 768)
        {
            var scroll = $(window).scrollTop();
            var nextsect = $("#portfolio").offset().top;
            
            if(scroll < nextsect)
            {
                //tambah angka negatif untuk lebih lambat
                var pos = scroll / -4;
                $(".header").css({"background-position": "0 0, 0 "+pos+"px"});
            }
        }
    }

    //animasi scroll untuk element tertentu
    function slideAnim()
    {
        $(".slideanim").each(function()
        {
            var elem = $(this);
            var arah = (elem.is("[data-slideanim]")) ? elem.data("slideanim") : "default";
            //var arah = (elem[0].hasAttribute("data-slideanim")) ? elem.data("slideanim") : "default";
            var pos = $(this).offset().top;
            var scroll = $(window).scrollTop();

            if (pos < scroll + 550)
            {
                if(arah == "default")
                {
                    $(this).addClass("slide-aktif");
                }
                else if(arah == "kiri")
                {
                    $(this).addClass("slide-kiri-aktif");
                }
                else
                {
                    $(this).addClass("slide-kanan-aktif");
                }
            }
        });
    }

    //show box skill
    function boxSkill()
    {
        var scroll = $(window).scrollTop();
        var pos = $(".box-skill").offset().top;

        if(pos < scroll + 350)
        {
            //Easy Pie Chart
            $('.chart').easyPieChart({
                lineWidth : 15,
                size : 152,
                barColor : '#FF675F',
                scaleColor : false,
                trackColor : '#E1E1E3',
                onStep: function(from, to, percent)
                {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        }
    }

    //animasi saat scroll window
    $(window).scroll(function()
    {
        navbarScroll();
        parallax();
        slideAnim();
        boxSkill();
    });

    //smooth scroll buat navbar
    $(".navbar a, .link-top").click(function(event)
    {
        //kalau preventDefault() dihilangin animasi slide ga jalan
        event.preventDefault();
        var hash = this.hash;

        if(hash !== "")
        {
            //kalau body dihilangin smooth scroll gajalan di mobile
            $("html, body").animate({scrollTop: $(hash).offset().top}, 900, function()
            {
                //taruh hash di link
                window.location.hash = hash;
            });
        }
    });

    //tutup navbar saat sudah diklik di mobile
    $(".collapse a").click(function()
    {
        if($(window).innerWidth() < 768 )
        {
            //.in class bawaan bootstrap di navbar
            $("#navigasi").removeClass("in");
        }
    });

    //hidden thumbnail portofolio muldai dari index ke (n)
    (function()
    {
        var lebar = $(window).innerWidth();

        if(lebar <= 768 || lebar >= 994)
        {
            $(".divporto").slice(3).css("display", "none");
        }
        else
        {
             $(".divporto").slice(4).css("display", "none");
        }
    })();

    //tampilkan hidden portofolio ketika di klik
    $("#extend-trigger").click(function(event)
    {
        event.preventDefault();
        var porto = $(".divporto").slice(3);
        var porto2 = $(".divporto").slice(4);
        var lebar = $(window).innerWidth();

        if( !$(this).hasClass("terbuka") )
        {
            $(this).addClass("terbuka");
            $(this).find("i").removeClass("fa-angle-double-down");
            $(this).find("i").addClass("fa-angle-double-up");
            $(this).find("span").text("Show Less");
            (lebar <= 768 || lebar >= 994) ? porto.slideDown(300): porto2.slideDown(300);
        }
        else
        {
            $(this).removeClass("terbuka");
            $(this).find("i").removeClass("fa-angle-double-up");
            $(this).find("i").addClass("fa-angle-double-down");
            $(this).find("span").text("Load More");
            (lebar <= 768 || lebar >= 994) ? porto.slideUp(200) : porto2.slideUp(300);
        }
    });
});