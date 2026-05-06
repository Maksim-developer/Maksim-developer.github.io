"use strict";

var $html = document.querySelector("html");
var $body = document.querySelector("body");
var isiPad = navigator.userAgent.match(/iPad/i);
var isMac = navigator.userAgent.toUpperCase().indexOf("MAC") >= 0;
if (/(iPhone|iPod|iPad)/i.test(navigator.platform)) {
  $html.classList.add("ios");
}
if (isMac) {
  $html.classList.add("MacOs");
}
if (isiPad) {
  $html.classList.add("iPad");
}
if (navigator.userAgent.match(/MSIE|Trident/) !== null) {
  $html.classList.add("MSIE");
}
function qs(className) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return root.querySelector(className);
}
function qsAll(className) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return root.querySelectorAll(className);
}
function getParent(element, className) {
  while (element && element.parentNode) {
    element = element.parentNode;
    if (element.classList && element.classList.contains(className)) {
      return element;
    }
  }
  return false;
}
var containsClass = function containsClass(element, className) {
  return element.classList.contains(className);
};
window.onload = function () {
  return document.querySelector("body").classList.add("page-loaded");
};
$(function () {
  var $body = $("body");
  var $windowWidth = $(window).width();
  window.autodealer = {};
  window.autodealer.form = {
    checkForm: function checkForm(form) {
      var checkResult = true;
      form.find(".error").removeClass("error");
      form.find("input, textarea, select").each(function () {
        if ($(this).data("req")) {
          switch ($(this).data("type")) {
            case "tel":
              var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
              if (!re.test($(this).val())) {
                $(this).parent().addClass("error");
                checkResult = false;
              }
              break;
            case "email":
              var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
              if (!re.test($(this).val())) {
                $(this).parent().addClass("error");
                checkResult = false;
              }
              break;
            case "new-pass":
              var passPrimary = $("[data-pass='primary']");
              var passConfirm = $("[data-pass='confirm']");
              if (passPrimary.length && passConfirm.length) {
                if (passPrimary.val().trim() === "" || passConfirm.val().trim() === "" || passPrimary.val().trim() !== passConfirm.val().trim()) {
                  passPrimary.parent().addClass("error");
                  passConfirm.parent().addClass("error");
                  checkResult = false;
                }
              }
              break;
            default:
              if ($(this).val().trim() === "") {
                $(this).parent().addClass("error");
                checkResult = false;
              }
              break;
          }
        }
      });
      return checkResult;
    },
    init: function init() {
      var _th = this;
      $("form").on("submit", function () {
        if (!_th.checkForm($(this))) {
          return false;
        }
      });
      if ($(".js-phone").length) {
        $(".js-phone").mask("+7(999) 999-9999");
      }
      if ($(".js-time").length) {
        $(".js-time").mask("99:99");
      }
      var passPrimary = $("[data-pass='primary']");
      var passConfirm = $("[data-pass='confirm']");
      if (passPrimary.length && passConfirm.length) {
        passPrimary.on("keyup", function () {
          var _t = $(this);
          var _tValue = _t.val().trim();
          var passConfirmValue = passConfirm.val().trim();
          if (passConfirmValue !== _tValue) {
            _t.parent().addClass("error");
            passConfirm.parent().addClass("error");
          } else {
            _t.parent().removeClass("error");
            passConfirm.parent().removeClass("error");
          }
        });
        passConfirm.on("keyup", function () {
          var _t = $(this);
          var _tValue = _t.val().trim();
          var passPrimaryValue = passPrimary.val().trim();
          if (passPrimaryValue !== _tValue) {
            _t.parent().addClass("error");
            passPrimary.parent().addClass("error");
          } else {
            _t.parent().removeClass("error");
            passPrimary.parent().removeClass("error");
          }
        });
      }
      return this;
    }
  }.init();
  window.autodealer.obj = {
    loginTabs: function loginTabs() {
      var blockedChangeLoginTab = false;
      $(".js-login-tabs-btn").on("click", function () {
        var _t = $(this);
        var _tData = _t.data("btn");
        var _tParent = _t.parents(".login");
        if (_tParent.find('.login__tabs-item[data-tab="' + _tData + '"]').length && !blockedChangeLoginTab) {
          blockedChangeLoginTab = true;
          _tParent.find(".login__tabs-item--active").fadeOut(300, function () {
            $(this).removeClass("login__tabs-item--active");
            _tParent.find('.login__tabs-item[data-tab="' + _tData + '"]').fadeIn(300, function () {
              $(this).addClass("login__tabs-item--active");
              blockedChangeLoginTab = false;
            });
          });
        }
        return false;
      });
    },
    burger: function burger() {
      $(".js-burger").on("click", function (e) {
        var _t = $(this);
        _t.toggleClass("active");
        if (!_t.hasClass("active") && $(".nav__list-item--active").length) {
          $(".nav__list-item").removeClass("nav__list-item--active");
        }
        $("body").toggleClass("open-menu");
        $(".main__aside").fadeToggle(350).css("display", "flex");
        e.preventDefault();
      });
    },
    navSublist: function nav() {
      $(".js-nav-sublist").on("click", function (e) {
        var _t = $(this);
        var _tData = _t.data("sublist-visibility");
        var _tParentsListItem = _t.parents(".nav__list-item");
        if ($windowWidth < 768) {
          if (_tData === "show") {
            _tParentsListItem.addClass("nav__list-item--active");
          }
          if (_tData === "hide") {
            _tParentsListItem.removeClass("nav__list-item--active");
          }
          e.preventDefault();
        }
      });
    },
    headerSearch: function headerSearch() {
      $(".js-header-search").on("click", function (e) {
        var _t = $(this);
        var _tData = _t.data("search-visibility");
        var _tSearchForm = _t.parents(".header__search").find(".header__search-form");
        if (_tData === "show") {
          _tSearchForm.fadeIn(350).css("display", "flex");
        }
        if (_tData === "hide") {
          _tSearchForm.fadeOut(350);
        }
        e.preventDefault();
      });
    },
    toggleSubmenu: function toggleSubmenu() {
      $(".js-toggle-submenu").on("click", function (e) {
        if (!$body.hasClass("open-submenu")) {
          $body.addClass("open-submenu");
        }
        if ($(".nav__sublist:visible").length) {
          $(".nav__sublist").fadeOut(300);
        }
        $(this).siblings(".nav__sublist").fadeIn(300);
        e.preventDefault();
      });
      $(document).on("click", function (e) {
        if (!$(e.target).closest(".nav").length) {
          if ($body.hasClass("open-submenu")) {
            $body.removeClass("open-submenu");
          }
          if ($(".nav__sublist:visible").length) {
            $(".nav__sublist").fadeOut(300);
          }
          e.stopPropagation();
        }
      });
    },
    table: function table() {
      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
      var tables = document.querySelectorAll(".table");
      setTimeout(function () {
        for (var tableIndex = 0; tableIndex < tables.length; tableIndex++) {
          if (!tables[tableIndex].classList.contains("table--created")) {
            var rows = tables[tableIndex].querySelectorAll(".table__row");
            var cells;
            if (tables[tableIndex].querySelector(".table__head")) {
              cells = tables[tableIndex].querySelectorAll(".table__head .table__row:first-child .table__cell");
            } else {
              cells = tables[tableIndex].querySelectorAll(".table__body .table__row:first-child .table__cell");
            }
            var arrayOfWidths = [];
            var summWidth = 0;

            // поиск максимальной ширины ячейки в столбце
            for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
              var maxWidth = 0;
              for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                if (rows[rowIndex].querySelector(".table__cell:nth-child(" + (cellIndex + 1) + ")")) {
                  if (rows[rowIndex].querySelector(".table__cell:nth-child(" + (cellIndex + 1) + ")").getAttribute("style") && rows[rowIndex].querySelector(".table__cell:nth-child(" + (cellIndex + 1) + ")").getAttribute("style").includes("width")) {
                    rows[rowIndex].querySelector(".table__cell:nth-child(" + (cellIndex + 1) + ")").style.width = "auto";
                  }
                  maxWidth = Math.max(Math.ceil(rows[rowIndex].querySelector(".table__cell:nth-child(" + (cellIndex + 1) + ")").clientWidth), maxWidth);
                  arrayOfWidths[cellIndex] = maxWidth;
                }
              }
            }

            // устанавливаем ширину для ячеек
            for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
              for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                if (rows[rowIndex].querySelector(".table__cell:nth-child(" + (cellIndex + 1) + ")") && arrayOfWidths[cellIndex] > 0) {
                  rows[rowIndex].querySelector(".table__cell:nth-child(" + (cellIndex + 1) + ")").style.width = arrayOfWidths[cellIndex] + "px";
                }
              }
              summWidth += arrayOfWidths[cellIndex];
            }

            // задаем минимальную ширину для таблицы
            if (summWidth > 0) {
              if (getParent(tables[tableIndex], "table-wrap__axis-x")) {
                tables[tableIndex].style.minWidth = summWidth + "px";
              }
              tables[tableIndex].classList.add("table--created");
            }

            // устанавливаем ширину для тоста в таблице
            if (tables[tableIndex].querySelectorAll(".toast").length && summWidth > 0 && summWidth < window.innerWidth - 130) {
              var toasts = tables[tableIndex].querySelectorAll(".toast");
              for (var toastIndex = 0; toastIndex < toasts.length; toastIndex++) {
                toasts[toastIndex].style.maxWidth = summWidth + "px";
              }
            }
          }
        }
      }, timeout);
    },
    tableHeight: function tableHeight() {
      var elementsHeight = 0;
      var elements = [];
      $(".js-table-calc-height").each(function (index, item) {
        if ($(item).parents(".tabs").length) {
          if ($(item).parents(".popup--right-position").length) {
            var popupParent = $(item).parents(".popup--right-position");
            if ($(window).width() > 767) {
              elementsHeight = 57 + 38;
              elements = [popupParent.find(".popup__top"), popupParent.find(".popup__bottom"), popupParent.find(".tabs__controls"), popupParent.find(".main__top--in-tabs")];
            } else {
              elementsHeight = 108;
              elements = [popupParent.find(".popup__top"), popupParent.find(".tabs__controls")];
            }
          } else {
            elementsHeight = 60 + 18; //header, tabs(внутренние отступы)
            elements = [$(".wrapper .header"), $(".wrapper .button-group"), $(".wrapper .document-info"), $(".wrapper .main__content > .main__title"), $(".wrapper .main__top--in-tabs"), $(".wrapper .form--invoice"), $(".wrapper .tabs__controls"), $(".wrapper .filter-checkboxes")];
          }
        } else {
          elementsHeight = 0;
          if ($(".wrapper .main__content > .main__title").length) {
            elementsHeight = 30; // .main__title(margin-bottom)
          }

          elements = [$(".wrapper .header"), $(".wrapper .main__top"), $(".wrapper .main__bottom"), $(".wrapper .main__content > .table-settings:visible"), $(".wrapper .main__content > .button-group"), $(".wrapper .main__content > .main__title")];
        }
        if (elements.length) {
          elements.forEach(function (element) {
            if (element.length) {
              elementsHeight = elementsHeight + element.outerHeight(element.hasClass("main__bottom") ? false : true);
            }
          });
        }
        $(item).css("height", $(window).height() - elementsHeight);
      });
    },
    carsHeight: function carsHeight() {
      var carsHeightNode = $(".js-cars-height");
      var elementsHeight = 0;
      var elements = [$(".header"), $(".main__top")];
      if (carsHeightNode.length) {
        elements.forEach(function (element) {
          if (element.length) {
            elementsHeight = elementsHeight + element.outerHeight(true);
          }
        });
        carsHeightNode.css("height", $(window).height() - elementsHeight);
      }
    },
    contextmenu: function contextmenu() {
      function checkingPosY(clientY, popup) {
        if ($(window).height() - clientY > popup.height()) {
          return clientY + "px";
        } else {
          return clientY - popup.height() + "px";
        }
      }
      function checkingPosX(clientX, popup) {
        if ($(window).width() - clientX > popup.width()) {
          return clientX + "px";
        } else {
          return clientX - popup.width() + "px";
        }
      }
      $(document).on("contextmenu", "[data-context]", function (e) {
        var _t = $(this);
        var _tData = _t.data("context");
        if ($(".popup-context#" + _tData).length) {
          var popup = $(".popup-context#" + _tData);
          popup.css({
            top: checkingPosY(e.clientY, popup),
            left: checkingPosX(e.clientX, popup)
          }).fadeIn(250);
        }
        return false;
      });
      $(document).on("click", function (e) {
        if (!$(e.target).closest(".popup-context").length) {
          if ($(".popup-context:visible").length) {
            $(".popup-context").fadeOut(250, function () {
              $(this).removeAttr("style");
            });
          }
          e.stopPropagation();
        }
      });
    },
    jqMfp: function mfp() {
      var _self = this;
      $(".js-mfp").magnificPopup({
        type: "inline",
        mainClass: "mfp-fade",
        closeOnBgClick: false,
        callbacks: {
          open: function open() {
            if ($(this)[0].content.find(".table").length) {
              _self.table();
            }
            if ($(this)[0].content.find(".table-wrap").length) {
              _self.tableHeight();
            }
          }
        }
      });
      $(".js-close-mfp").on("click", function (e) {
        $.magnificPopup.close();
        e.preventDefault();
      });
    },
    previewImage: function previewImage() {
      var popupPreview = $(".popup-preview");
      var popupPreviewBtnShow = $(".js-preview-image");
      var popupPreviewBtnClose = $(".js-preview-image-close");
      popupPreviewBtnShow.on("click", function (e) {
        if (popupPreview.length && !$(e.target).hasClass("uploaded-list__item-delete") && !$(e.target).hasClass("uploaded-list__item-download")) {
          popupPreview.fadeIn(350);
        }
        e.preventDefault();
      });
      if (popupPreviewBtnClose.length) {
        popupPreviewBtnClose.on("click", function (e) {
          if (popupPreview.length) {
            popupPreview.fadeOut(350);
          }
          e.preventDefault();
        });
      }
    },
    jqSelect: function jqSelect() {
      $(".js-select").styler({
        selectSmartPositioning: true
      });
      function customizationSelects() {
        $("select.js-select").each(function (index, item) {
          var _t = $(item),
            _tParent = _t.parent(".jq-selectbox");
          if (!_tParent.find(".jq-selectbox__reset").length) {
            _tParent.prepend('<button type="button" class="jq-selectbox__reset js-select-reset"></button>');
          }
          if (_t.data("btn") && !_tParent.find(".jq-selectbox__bottom").length) {
            var _data = $(item).data("btn");
            _tParent.find(".jq-selectbox__dropdown").append('<div class="jq-selectbox__bottom"><a href="' + _data.namePopup + '" class="js-delegate-mfp"><span>' + _data.title + "<span></a></div>");
          }
          if (_t.data("option-reset") && !_tParent.find("li.option-reset").length) {
            var _data = _t.data("option-reset");
            _tParent.find(".jq-selectbox__dropdown ul").prepend('<li class="option-reset js-select-reset">' + _data + "</li>");
          }
          if (_t.data("action-option")) {
            var dataOptions = _t.data("action-option");
            if (dataOptions.length) {
              var options = _tParent.find(".jq-selectbox__dropdown li");
              var actions = '<div class="actions">';
              if (!_tParent.hasClass("jq-selectbox--actions")) {
                _tParent.addClass("jq-selectbox--actions");
              }
              for (var i = 0; i < dataOptions.length; i++) {
                var type = "actions__item-btn--" + dataOptions[i].type;
                actions = actions + '<div class="actions__item"><a class="actions__item-btn ' + type + ' js-tooltip" href="#" title="' + dataOptions[i].title + '"></a></div>';
              }
              actions = actions + "</div>";
              for (var i = 0; i < options.length; i++) {
                if (!$(options[i]).find(".actions").length) {
                  $(options[i]).append(actions);
                }
              }
            }
          }
        });
      }
      customizationSelects();
      $(document).on("click", ".js-select-reset", function () {
        if ($(this).parents(".jq-selectbox").find("select").length) {
          $(this).parents(".jq-selectbox").find("select").val("");
          $(this).parents(".jq-selectbox").find("select").trigger("refresh");
          customizationSelects();
        }
      });
    },
    tabs: function tabs() {
      var blockedChangeTab = false;
      $(".js-btn-tabs").on("click", function (e) {
        var _t = $(this);
        var _tData = _t.data("tab-btn");
        var _tParent = _t.parents(".tabs").first();
        var tabsBtns = _tParent.find("> .tabs__controls .tabs__controls-btn");
        var tabsItems = _tParent.find("> .tabs__items .tabs__item");
        if (!_t.hasClass("tabs__controls-btn--active") && _tParent.find('.tabs__item[data-tab-item="' + _tData + '"]').length && !blockedChangeTab) {
          blockedChangeTab = true;
          tabsBtns.removeClass("tabs__controls-btn--active");
          _t.addClass("tabs__controls-btn--active");
          tabsItems.removeClass("tabs__item--active");
          setTimeout(function () {
            _tParent.find('.tabs__item[data-tab-item="' + _tData + '"]').addClass("tabs__item--active");
            setTimeout(function () {
              blockedChangeTab = false;
            }, 300);
          }, 300);
        }
        e.preventDefault();
      });
    },
    tabsItemHeight: function tabsItemHeight() {
      var tabsItem = document.querySelectorAll(".js-tabs-item-height");
      var windowHeight = window.innerHeight;
      var pageYOffset = window.pageYOffset;
      for (var tabsItemIndex = 0; tabsItemIndex < tabsItem.length; tabsItemIndex++) {
        var rect = tabsItem[tabsItemIndex].getBoundingClientRect();
        tabsItem[tabsItemIndex].style.height = windowHeight - (pageYOffset + rect.top) + "px";
      }
    },
    countCharacters: function countCharacters() {
      $(".js-count-characters").each(function () {
        var _t = $(this);
        var _tMaxLength = parseInt(_t.attr("maxlength"));
        var _tParent = _t.parents(".form__field");
        var countItem = _tParent.find(".count-characters__item");
        var countAll = _tParent.find(".count-characters__all");
        countItem.text(_t.val().length);
        countAll.text(_tMaxLength);
      });
      $(".js-count-characters").on("keydown keyup", function () {
        var _t = $(this);
        var _tMaxLength = parseInt(_t.attr("maxlength"));
        var _tParent = _t.parents(".form__field");
        var countItem = _tParent.find(".count-characters__item");
        if (_t.val().length > _tMaxLength) {
          _t.val(_t.val().substring(0, _tMaxLength));
        } else {
          countItem.text(_t.val().length);
        }
      });
    },
    dragAndDropFiles: function dragAndDropFiles() {
      $("html").on("dragover", function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
      $("html").on("drop", function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
      $(".js-drag-and-drop-files").on("dragover", function () {
        $(this).addClass("drag_over");
        return false;
      });
      $(".js-drag-and-drop-files").on("dragleave", function () {
        $(this).removeClass("drag_over");
        return false;
      });
      $(".js-drag-and-drop-files").on("drop", function (e) {
        e.preventDefault();
        $(this).removeClass("drag_over");
        var formData = new FormData();
        var files = e.originalEvent.dataTransfer.files;
        for (var i = 0; i < files.length; i++) {
          formData.append("file[]", files[i]);
        }
        uploadFormData(formData);
      });
      function uploadFormData(form_data) {
        console.log("form_data", form_data);
        // $.ajax({
        // 	url: "",
        // 	method: "POST",
        // 	data: form_data,
        // 	contentType: false,
        // 	cache: false,
        // 	processData: false,
        // 	success: function (data) {}
        // });
      }
    },

    newMarker: function newMarker() {
      $(".js-new-marker-input").on("keypress", function (event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        var _t = $(this),
          _tParent = _t.parents(".form__field-markers"),
          classPrefix = "";
        if (_t.val().trim() !== "" && keycode == 13) {
          if (_tParent.hasClass("form__field-markers--green")) {
            classPrefix = "new-marker--green";
          }
          $('<div class="new-marker ' + classPrefix + '">' + "<span>" + _t.val() + "</span>" + '<button class="new-marker__delete js-marker-delete" type="button"></button>' + "</div>").insertBefore(_t);
          _t.val("");
        }
      });
      $(document).on("click", ".js-marker-delete", function () {
        $(this).parent(".new-marker").remove();
      });
    },
    filterDropdownVisibility: function filterDropdownVisibility() {
      $(".js-filter-dropdown-visibility").on("click", function (e) {
        var _t = $(this);
        var _tData = _t.data("dropdown-visibility");
        var _tfilterMobileItem = _t.parents(".filter-mobile__item");
        if (_tData === "show") {
          _tfilterMobileItem.addClass("filter-mobile__item--active");
        }
        if (_tData === "hide") {
          _tfilterMobileItem.removeClass("filter-mobile__item--active");
        }
        e.preventDefault();
      });
    },
    init: function init() {
      var _self = this;
      if ($(".js-login-tabs-btn").length) _self.loginTabs();
      if ($(".js-burger").length) _self.burger();
      if ($(".js-nav-sublist").length) _self.navSublist();
      if ($(".js-header-search").length) _self.headerSearch();
      if ($(".js-toggle-submenu").length) _self.toggleSubmenu();
      if ($(".table").length) _self.table();
      if ($(".js-table-calc-height").length) _self.tableHeight();
      if ($(".js-cars-height").length) _self.carsHeight();
      if ($("[data-context]").length) _self.contextmenu();
      if ($(".js-mfp").length) _self.jqMfp();
      if ($(".js-preview-image").length) _self.previewImage();
      if ($(".js-select").length) _self.jqSelect();
      if ($(".js-btn-tabs").length) _self.tabs();
      if ($(".js-tabs-item-height").length) _self.tabsItemHeight();
      if ($(".js-count-characters").length) _self.countCharacters();
      if ($(".js-drag-and-drop-files").length) _self.dragAndDropFiles();
      if ($(".js-new-marker-input").length) _self.newMarker();
      if ($(".js-filter-dropdown-visibility").length) _self.filterDropdownVisibility();
      if ($(".main__aside").length && $windowWidth > 1239) {
        $(".main__aside").on("mouseenter", function (e) {
          if (!$body.hasClass("menu-open") && !$(e.target).hasClass("main__menu-toggle")) {
            $body.addClass("menu-active");
          }
        }).on("mouseleave", function () {
          if ($body.hasClass("menu-active")) {
            $body.removeClass("menu-active");
          }
        });
      }
      if ($(".js-menu-toggle").length) {
        $(".js-menu-toggle").on("click", function (e) {
          $body.toggleClass("menu-open");
          e.preventDefault();
        });
      }
      if ($(".js-toggle-main-dropdown").length) {
        $(".js-toggle-main-dropdown").on("click", function (e) {
          $(this).parents().toggleClass("active");
          $(this).siblings(".main__btn-dropdown").fadeToggle(350);
          e.preventDefault();
        });
      }
      if ($(".js-toggle-main-summ-dropdown").length) {
        $(".js-toggle-main-summ-dropdown").on("click", function (e) {
          $(this).parents().toggleClass("active");
          $(this).siblings(".main__summ-dropdown").fadeToggle(350);
          e.preventDefault();
        });
      }
      if ($(".js-main-bottom-toggle").length) {
        $(".js-main-bottom-toggle").on("click", function (e) {
          var _t = $(this);
          _t.toggleClass("active");
          _t.siblings(".main__bottom-container").fadeToggle(350);
          if (_t.hasClass("active")) {
            $body.addClass("bottom-hide");
          } else {
            $body.removeClass("bottom-hide");
          }
          setTimeout(function () {
            if ($(".table-wrap:not(.table-wrap--no-axis-y)").length) {
              _self.tableHeight();
            }
          }, 400);
          e.preventDefault();
        });
      }
      if ($(".js-table-settings-toggle").length) {
        $(".js-table-settings-toggle").on("click", function (e) {
          $(this).toggleClass("active");
          if ($(".table-settings").length) {
            $(".table-settings").fadeToggle(350);
            setTimeout(function () {
              if ($(".table-wrap:not(.table-wrap--no-axis-y)").length) {
                _self.tableHeight();
              }
            }, 400);
          }
          e.preventDefault();
        });
      }
      if ($(".js-scroll").length) {
        $(".js-scroll").overlayScrollbars({
          className: "os-theme-dark"
        });
      }
      if ($(".js-scroll-x").length) {
        $(".js-scroll-x").overlayScrollbars({
          className: "os-theme-dark",
          overflowBehavior: {
            x: "scroll",
            y: "hidden"
          }
        });
      }
      if ($(".js-scroll-y").length) {
        $(".js-scroll-y").overlayScrollbars({
          className: "os-theme-dark",
          overflowBehavior: {
            x: "hidden",
            y: "scroll"
          }
        });
      }
      if ($(".js-chat-scroll-y").length) {
        $(".js-chat-scroll-y").overlayScrollbars({
          className: "os-theme-dark",
          overflowBehavior: {
            x: "hidden",
            y: "scroll"
          },
          callbacks: {
            onInitialized: function onInitialized() {
              var instance = this;
              setTimeout(function () {
                instance.scroll({
                  y: "100%"
                });
              }, 100);
            }
          }
        });
      }
      if ($(".js-datepicker-inline").length) {
        $(".js-datepicker-inline").datepicker({
          inline: true
        });
      }
      if ($(".js-datepicker-period").length) {
        $(".js-datepicker-period").datepicker({
          range: true
        });
      }
      if ($(".js-datepicker").length) {
        $(".js-datepicker").datepicker({
          offset: 4
        });
      }
      if ($(".js-timepicker").length) {
        $(".js-timepicker").datepicker({
          offset: 4,
          onlyTimepicker: true,
          timepicker: true,
          classes: "datepicker--only-timepicker"
        });
      }
      if ($(".js-tooltip").length) {
        $(".js-tooltip").each(function (index, item) {
          $(item).tooltipster({
            side: ["bottom"],
            arrow: false,
            distance: 5,
            delay: 100,
            maxWidth: 320,
            functionInit: function functionInit(instance, helper) {
              var $origin = $(helper.origin);
              var dataOptions = $origin.attr("data-tooltipster");
              if (dataOptions) {
                dataOptions = JSON.parse(dataOptions);
                $.each(dataOptions, function (name, option) {
                  instance.option(name, option);
                });
              }
            },
            functionPosition: function functionPosition(instance, helper, position) {
              var $origin = $(helper.origin);
              var dataOptions = $origin.attr("data-tooltipster");
              if (dataOptions) {
                var dataOptionsParse = JSON.parse(dataOptions);
                if (typeof dataOptionsParse["side"] !== "undefined") {
                  if (dataOptionsParse.side === "top" || dataOptionsParse.side === "bottom") {
                    if (typeof dataOptionsParse["align"] !== "undefined") {
                      if (dataOptionsParse.align === "left") {
                        var helperLeft = helper.geo.origin.offset.left;
                        position.coord.left = helperLeft;
                        return position;
                      }
                      if (dataOptionsParse.align === "right") {
                        var helperRight = helper.geo.origin.offset.right;
                        var width = position.size.width;
                        position.coord.left = helperRight - width;
                        return position;
                      }
                    }
                  }
                }
              }
            }
          });
        });
      }
      if ($(".js-mask").length) {
        $(".js-mask").each(function (index, item) {
          var _t = $(item);
          if (_t.data("mask").toString()) {
            _t.mask(_t.data("mask").toString());
          }
        });
      }
      if (document.querySelectorAll(".js-colorpicker").length) {
        var setColorToInput = function setColorToInput(instance) {
          var color = instance.getColor().toHEXA().toString();
          var inputNext = instance._root.root.nextElementSibling;
          var inputPrev = instance._root.root.previousElementSibling;
          if (inputPrev) {
            inputPrev.value = color;
          }
          if (inputNext) {
            inputNext.value = color;
          }
        };
        document.querySelectorAll(".js-colorpicker").forEach(function (item, index) {
          var pickr = Pickr.create({
            el: item,
            theme: "monolith",
            // 'classic', or 'monolith', or 'nano'
            default: "#fafafa",
            comparison: false,
            swatches: ["rgba(244, 67, 54, 1)", "rgba(233, 30, 99, 1)", "rgba(156, 39, 176, 1)", "rgba(103, 58, 183, 1)", "rgba(63, 81, 181, 1)", "rgba(33, 150, 243, 1)", "rgba(3, 169, 244, 1)", "rgba(0, 188, 212, 1)", "rgba(0, 150, 136, 1)", "rgba(76, 175, 80, 1)", "rgba(139, 195, 74, 1)", "rgba(205, 220, 57, 1)", "rgba(255, 235, 59, 1)", "rgba(255, 193, 7, 1)"],
            defaultRepresentation: "HEX",
            components: {
              preview: true,
              opacity: true,
              hue: true,
              interaction: {
                hex: false,
                rgba: false,
                hsva: false,
                input: true,
                clear: false,
                save: false
              }
            },
            i18n: {
              // Strings visible in the UI
              "ui:dialog": "диалоговое окно выбора цвета",
              "btn:toggle": "Показать/скрыть диалоговое окно выбора цвета",
              "btn:swatch": "образец цвета",
              "btn:last-color": "использовать предыдущий цвет",
              "btn:save": "Сохранить",
              "btn:cancel": "Отменить",
              "btn:clear": "Очистить",
              // Strings used for aria-labels
              "aria:btn:save": "сохранить и закрыть",
              "aria:btn:cancel": "отменить и закрыть",
              "aria:btn:clear": "очистить и закрыть",
              "aria:input": "поле ввода цвета",
              "aria:palette": "область выбора цвета",
              "aria:hue": "ползунок выбора оттенка",
              "aria:opacity": "ползунок выбора"
            }
          });
          pickr.on("changestop", function (source, instance) {
            setColorToInput(instance);
          }).on("swatchselect", function (color, instance) {
            setColorToInput(instance);
          });
        });
      }
      if ($(".js-filter-popup-toggle").length) {
        $(".js-filter-popup-toggle").on("click", function (e) {
          var _t = $(this);
          var _tParents = _t.parents(".filter-item");
          _tParents.addClass("active");
          if (_tParents.hasClass("filter-item--letter")) {
            _tParents.find(".filter-item__popup").fadeIn(350).css("display", "flex");
          } else {
            _tParents.find(".filter-item__popup").fadeIn(350);
          }
          e.preventDefault();
        });
      }
      if ($(".js-filter-popup-close").length) {
        $(".js-filter-popup-close").on("click", function (e) {
          var _t = $(this);
          var _tParents = _t.parents(".filter-item");
          _tParents.removeClass("active");
          _tParents.find(".filter-item__popup").fadeOut(350);
          e.preventDefault();
        });
      }
      if ($(".js-auto-item-toggle").length) {
        $(".js-auto-item-toggle").on("click", function (e) {
          var _t = $(this);
          var _tParent = _t.parents(".auto__item");
          _tParent.toggleClass("auto__item--active");
          _tParent.find(".auto__item-content").fadeToggle(350);
          e.preventDefault();
        });
      }
      if ($(".js-radio-action").length) {
        $(".js-radio-action").on("change", function () {
          var _t = $(this);
          var _tData = _t.data("action");
          var _tParent = _t.parents(".form__field");
          var _tFieldInput = _tParent.find(".form__field-input");
          var _tFieldTextarea = _tParent.find(".form__field-textarea");
          if (_t.is(":checked")) {
            if (typeof _tData !== "undefined" && _tData === "blocked") {
              if (_tFieldInput) {
                _tFieldInput.prop("readonly", true);
              }
              if (_tFieldTextarea) {
                _tFieldTextarea.prop("readonly", true);
              }
            } else {
              if (_tFieldInput) {
                _tFieldInput.prop("readonly", false);
              }
              if (_tFieldTextarea) {
                _tFieldTextarea.prop("readonly", false);
              }
            }
          }
        });
      }
      if ($(".js-blocked-field").length) {
        $(".js-blocked-field").on("change", function () {
          var _t = $(this);
          var _tParent = _t.parents(".form__field");
          var _tFieldInput = _tParent.find(".form__field-input");
          var _tFieldTextarea = _tParent.find(".form__field-textarea");
          var _tFieldSelect = _tParent.find(".jq-selectbox");
          if (_t.is(":checked")) {
            _tParent.addClass("readonly");
            if (_tFieldInput) {
              _tFieldInput.prop("readonly", true).val("");
            }
            if (_tFieldTextarea) {
              _tFieldTextarea.prop("readonly", true).val("");
            }
            if (_tFieldSelect) {
              _tFieldSelect.find(".js-select-reset").trigger("click");
            }
          } else {
            _tParent.removeClass("readonly");
            if (_tFieldInput) {
              _tFieldInput.prop("readonly", false);
            }
            if (_tFieldTextarea) {
              _tFieldTextarea.prop("readonly", false);
            }
          }
        });
      }
      if ($(".js-add-ruble").length) {
        $(".js-add-ruble").on("keyup", function () {
          var _t = $(this);
          if (_t.val().trim() !== "") {
            var val = _t.val().replace(" ₽", "");
            _t.val("".concat(val, " \u20BD"));
          }
        });
      }
      if ($(".js-contractor-cars-toggle").length) {
        $(".js-contractor-cars-toggle").on("click", function (e) {
          $(this).toggleClass("active");
          e.preventDefault();
        });
      }
      if ($(".js-more-toggle").length) {
        $(".js-more-toggle").on("click", function (e) {
          var _t = $(this);
          var _tDropdown = _t.siblings("[data-dropdown]");
          var _moreToggleActiveElem = $(".js-more-toggle.active");
          if (_tDropdown.data("dropdown") === "spare-parts" && $windowWidth < 768) {
            $.magnificPopup.open({
              items: {
                src: "#spare-parts"
              },
              type: "inline",
              mainClass: "mfp-fade",
              closeOnBgClick: false
            });
            return;
          }
          if (_t.hasClass("active")) {
            _t.removeClass("active");
            _tDropdown.fadeOut(350);
          } else {
            if (_moreToggleActiveElem.length) {
              _moreToggleActiveElem.removeClass("active").siblings("[data-dropdown]").fadeOut(350);
            }
            _t.addClass("active");
            _tDropdown.fadeIn(350);
          }
          e.preventDefault();
        });
      }
      if ($(".js-notif-toggle").length) {
        $(".js-notif-toggle").on("click", function (e) {
          $(this).siblings(".notif").fadeToggle(350);
          $body.toggleClass("notif-open");
          e.preventDefault();
        });
      }
      if ($(".js-notif-setting-sublist-toglle").length) {
        $(".js-notif-setting-sublist-toglle").on("click", function (e) {
          $(this).toggleClass("notif__setting-btn--active");
          e.preventDefault();
        });
      }
      if ($(".js-history-orders-group-toggle").length) {
        $(".js-history-orders-group-toggle").on("click", function (e) {
          var _t = $(this);
          var _tGroupContent = _t.parents(".history-orders__group").find(".history-orders__group-content");
          if (_t.hasClass("history-orders__group-toggle--active")) {
            _t.removeClass("history-orders__group-toggle--active");
            _tGroupContent.fadeOut(350);
          } else {
            _t.addClass("history-orders__group-toggle--active");
            _tGroupContent.fadeIn(350);
          }
          e.preventDefault();
        });
      }
      if ($(".js-history-orders-item-toggle").length) {
        $(".js-history-orders-item-toggle").on("click", function (e) {
          var _t = $(this);
          var _tGroupContent = _t.parents(".history-orders__item").find(".history-orders__item-content");
          if (_t.hasClass("history-orders__item-toggle--active")) {
            _t.removeClass("history-orders__item-toggle--active");
            _tGroupContent.fadeOut(350, function () {
              $(this).removeClass("history-orders__item-content--visible");
            });
          } else {
            _t.addClass("history-orders__item-toggle--active");
            _tGroupContent.fadeIn(350, function () {
              $(this).addClass("history-orders__item-content--visible");
            });
            setTimeout(function () {
              if ($(".table").length) {
                _self.table();
              }
            }, 350);
          }
          e.preventDefault();
        });
      }
      if ($(".js-order-toggle").length) {
        $(".js-order-toggle").on("click", function (e) {
          $body.toggleClass("order-visible");
          e.preventDefault();
        });
      }
      if ($(".js-order-car-toggle").length) {
        $(".js-order-car-toggle").on("click", function (e) {
          var _t = $(this);
          var _tParent = _t.parents(".order__car");
          var _tDropdown = _tParent.find(".order__car-content");
          if (_tParent.hasClass("order__car--open")) {
            _tParent.removeClass("order__car--open");
            _tDropdown.fadeOut(300);
          } else {
            _tParent.addClass("order__car--open");
            _tDropdown.fadeIn(300);
          }
          e.preventDefault();
        });
      }
      if ($(".js-product-card-toggle").length) {
        $(".js-product-card-toggle").on("click", function (e) {
          $body.toggleClass("product-card-visible");
          e.preventDefault();
        });
      }

      /*демо, для демонстрации выпадашки у фильтров под поиском*/
      if ($(".js-toggle-table-filter-item").length) {
        var toggleTableFilterItem = $(".js-toggle-table-filter-item");
        toggleTableFilterItem.on("click", function (e) {
          var _t = $(this);
          var _tParent = _t.parents(".table-settings__filter-top");
          var _tDropdown = _tParent.siblings(".table-settings__filter-dropdown");
          if (_tParent.hasClass("table-settings__filter-top--open")) {
            _tParent.removeClass("table-settings__filter-top--open");
            _tDropdown.fadeOut(350);
          } else {
            toggleTableFilterItem.parents(".table-settings__filter-top").removeClass("table-settings__filter-top--open").siblings(".table-settings__filter-dropdown").fadeOut(350);
            _tParent.addClass("table-settings__filter-top--open");
            _tDropdown.fadeIn(350);
          }
          e.preventDefault();
        });
      }
      /*end - демо, для демонстрации выпадашки у фильтров под поиском*/

      /*демо, для демонстрации выпадашки у поиска*/
      if ($(".js-search-input").length) {
        $(".js-search-input").on("keyup", function () {
          var _t = $(this),
            _tParent = $(this).parent(".form-search");
          if (_t.val().trim() !== "") {
            if (!_tParent.hasClass("form-search--not-empty")) {
              _tParent.addClass("form-search--not-empty");
            }
            if (_tParent.find(".form-search__dropdown").length) {
              _tParent.find(".form-search__dropdown").fadeIn(350);
            }
          }
        });
      }
      if ($(".js-search-clear").length) {
        $(".js-search-clear").on("click", function (e) {
          var _t = $(this),
            _tParent = _t.parents(".form-search"),
            _tInput = _tParent.find(".form-search__input"),
            _tDropdown = _tParent.find(".form-search__dropdown");
          if (_tInput.length) {
            _tInput.val("");
          }
          if (_tDropdown.length) {
            _tDropdown.fadeOut(350);
          }
          _tParent.removeClass("form-search--not-empty");
          e.preventDefault();
        });
      }
      /*end - демо, для демонстрации выпадашки у поиска*/

      if ($(".js-toggle-car-action").length) {
        $(".js-toggle-car-action").on("click", function (e) {
          var _t = $(this);
          var _tParents = _t.parents(".car__action");
          var _tDropdown = _t.siblings(".car__action-dropdown");
          var _timeout = 0;

          // проверяем умещается ли выпадашка в размеры окна (правая граница окна)
          if ($(window).width() - _t.offset().left < 140) {
            _tParents.toggleClass("position-right");
            _timeout = 50;
          }
          setTimeout(function () {
            _tParents.toggleClass("active");
            _tDropdown.fadeToggle(300);
          }, _timeout);
          e.preventDefault();
        });
      }
      if ($(".car").length) {
        $(".car").on("mouseleave", function () {
          var _t = $(this);
          if (_t.find(".car__action.active").length) {
            _t.find(".car__action").removeClass("active position-right");
            _t.find(".car__action-dropdown").fadeOut(0);
          }
        });
      }
      if ($(".js-toggle-common-dropdown").length) {
        $(".js-toggle-common-dropdown").on("click", function (e) {
          var _t = $(this);
          var _tParent = _t.parent();
          var _tDropdown = _t.siblings(".common-dropdown");
          var _tDropdownTable = _tDropdown.find(".table");
          var btnsToggleDropdown = $(".js-toggle-common-dropdown");
          if (_t.hasClass("record-date__current-item") && $(window).width() < 480) {
            $.magnificPopup.open({
              items: {
                src: "#mobile-date"
              },
              type: "inline",
              mainClass: "mfp-fade",
              closeOnBgClick: false
            });
            return;
          }
          if (_t.hasClass("active")) {
            _t.removeClass("active");
            _tParent.removeClass("active");
            _tDropdown.fadeOut(300, function () {
              if (_tDropdownTable.length) {
                _tDropdownTable.css("opacity", "0");
              }
            });
          } else {
            if (btnsToggleDropdown.hasClass("active")) {
              btnsToggleDropdown.removeClass("active");
              btnsToggleDropdown.parent().removeClass("active");
              btnsToggleDropdown.siblings(".common-dropdown").fadeOut(300);
            }
            _t.addClass("active");
            _tParent.addClass("active");
            _tDropdown.fadeIn(300, function () {
              if (_tDropdownTable.length) {
                _self.table(0);
                setTimeout(function () {
                  _tDropdownTable.css("opacity", "1");
                }, 50);
              }
            });
          }
          e.preventDefault();
        });
      }
      if ($(".js-toggle-tags-dropdown").length) {
        $(".js-toggle-tags-dropdown").on("click", function (e) {
          var _t = $(this);
          var _tParent = _t.parent();
          var _tDropdown = _t.siblings(".tags-dropdown");
          _t.toggleClass("active");
          _tParent.toggleClass("active");
          _tDropdown.fadeToggle(300);
          e.preventDefault();
        });
      }
      if ($(".js-toggle-version-dropdown").length) {
        $(".js-toggle-version-dropdown").on("click", function (e) {
          var _t = $(this);
          var _tParent = _t.parent();
          var _tDropdown = _t.siblings(".main__version-dropdown");
          _t.toggleClass("active");
          _tParent.toggleClass("active");
          _tDropdown.fadeToggle(300);
          e.preventDefault();
        });
      }
      if ($(".js-fuel").length) {
        var fuel = $(".js-fuel");
        var fuelSectors = fuel.find(".fuel-ico__sector");
        var fuelInput = fuel.find(".fuel__input");
        fuelSectors.on("click", function (e) {
          var _tSector = $(this);
          if (!_tSector.hasClass("selected")) {
            fuelSectors.removeClass("active selected");
            _tSector.addClass("selected");
            _tSector.prevAll(".fuel-ico__sector").addClass("active");
            fuelInput.prop("value", (_tSector.index() + 1) * 0.25);
          } else {
            _tSector.removeClass("selected");
            fuelSectors.removeClass("active");
            fuelInput.prop("value", "");
          }
          e.preventDefault();
        });
        fuelSectors.on("mouseenter", function () {
          var _t = $(this);
          var fuelSectorSelected = $(".fuel-ico__sector.selected");
          if (!_t.hasClass("active")) {
            fuelSectors.removeClass("active");
            _t.addClass("active");
            _t.prevAll(".fuel-ico__sector").addClass("active");
          } else {
            if (fuelSectorSelected.length) {
              if (_t.index() >= fuelSectorSelected.index()) {
                _t.nextAll(".fuel-ico__sector").removeClass("active");
              }
            } else {
              _t.nextAll(".fuel-ico__sector").removeClass("active");
            }
          }
        });
        fuelSectors.on("mouseleave", function () {
          if (!$(".fuel-ico__sector.selected").length) {
            fuelSectors.removeClass("active");
          }
        });
      }
      if ($(".js-toggle-scheme").length) {
        var toggleScheme = function toggleScheme(toggleSchemeBtn) {
          if (typeof toggleSchemeBtn !== "undefined") {
            var data = toggleSchemeBtn.data("scheme-btn");
            var toggleSchemeBtnParent = toggleSchemeBtn.parents(".inspection-act__scheme-toggle");
            var parent = $(".inspection-act");
            var schemesImg = parent.find(".inspection-act__scheme-img");
            var toggleSchemeBtns = parent.find(".common-dropdown__list-href[data-scheme-btn]");
            var damageMarkers = parent.find(".damage-marker");
            if (parent.find('.inspection-act__scheme-img[data-scheme-img="' + data + '"]').length) {
              if (damageMarkers.length) {
                damageMarkers.remove();
              }
              toggleSchemeBtnParent.find(".js-toggle-common-dropdown").click();
              toggleSchemeBtns.removeClass("common-dropdown__list-href--active");
              toggleSchemeBtn.addClass("common-dropdown__list-href--active");
              schemesImg.fadeOut(300, function () {
                $(this).removeClass("active");
              });
              setTimeout(function () {
                parent.find('.inspection-act__scheme-img[data-scheme-img="' + data + '"]').fadeIn(300, function () {
                  $(this).addClass("active");
                });
              }, 350);
            }
          }
        };
        var selectedToggleScheme;
        $(".js-toggle-scheme").on("click", function (e) {
          var _t = $(this);
          var _tData = _t.data("scheme-btn");
          var _tParents = _t.parents(".inspection-act__scheme");
          if (_tParents.find('.inspection-act__scheme-img[data-scheme-img="' + _tData + '"]').length) {
            if (_tParents.find(".damage-marker").length) {
              selectedToggleScheme = _t;
              $.magnificPopup.open({
                items: {
                  src: "#confirm-change-schem"
                },
                type: "inline",
                mainClass: "mfp-fade",
                closeOnBgClick: false
              });
              return;
            }
            toggleScheme(_t);
          }
          e.preventDefault();
        });
        if ($(".js-confirm-change-schem").length) {
          $(".js-confirm-change-schem").on("click", function (e) {
            if (typeof selectedToggleScheme !== "undefined") {
              $.magnificPopup.close();
              toggleScheme(selectedToggleScheme);
            }
            e.preventDefault();
          });
        }
      }
      if ($(".js-scheme-area").length) {
        $(document).on("contextmenu", ".js-scheme-area", function (e) {
          var _t = $(this);
          var _tContextMenu = _t.siblings(".inspection-act__scheme-context");
          if ($(".damage-marker__toggle.active").length) {
            $(".damage-marker__toggle.active ~ .damage-marker__dropdown").fadeOut(0);
            $(".damage-marker__toggle.active").removeClass("active");
          }
          if (_tContextMenu.length) {
            _tContextMenu.addClass("active").css({
              top: e.offsetY + "px",
              left: e.offsetX + "px"
            }).fadeIn(250);
          }
          e.preventDefault();
        });
      }
      if ($(".js-scheme-context-btn").length) {
        var markerTemplate = function markerTemplate(posTop, posLeft, classIco) {
          return "<div class=\"damage-marker\" \n\t\t\t\t\t\tstyle=\"top: ".concat(posTop - 15, "px; left: ").concat(posLeft - 15, "px\">\n\t\t\t\t\t\t\t<button type=\"button\" class=\"damage-marker__toggle ").concat(classIco, " js-damage-marker-toggle\"></button>\n\t\t\t\t\t\t\t<div class=\"damage-marker__dropdown common-dropdown\">\n\t\t\t\t\t\t\t\t<ul class=\"common-dropdown__list\">\n\t\t\t\t\t\t\t\t\t<li class=\"common-dropdown__list-item\">\n\t\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"common-dropdown__list-href js-remove-damage-marker\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>");
        };
        $(".js-scheme-context-btn").on("click", function (e) {
          var _t = $(this);
          var _tData = _t.data("ico");
          var _tContextMenu = _t.parents(".inspection-act__scheme-context");
          var _tHeadParent = _t.parents(".inspection-act__scheme-item");
          var _tMarkersWrap = _tHeadParent.find(".inspection-act__scheme-markers");
          _tMarkersWrap.append(markerTemplate(_tContextMenu[0].offsetTop, _tContextMenu[0].offsetLeft, _tData));
          _tContextMenu.removeClass("active").fadeOut(250, function () {
            $(this).removeAttr("style");
          });
          e.preventDefault();
        });
      }
      if ($(".js-toggle-complex-tree").length) {
        $(".js-toggle-complex-tree").on("click", function (e) {
          var _t = $(this);
          _t.parents(".complex-tree-wrap").toggleClass("complex-tree-wrap--hide");
          e.preventDefault();
        });
      }
      if ($(".js-complex-tree-selected").length) {
        $(".js-complex-tree-selected").on("click", function (e) {
          var _t = $(this);
          if (_t.hasClass("complex-tree__item-title--selected")) {
            _t.removeClass("complex-tree__item-title--selected");
          } else {
            $(".js-complex-tree-selected").removeClass("complex-tree__item-title--selected");
            _t.addClass("complex-tree__item-title--selected");
          }
          if (_t.siblings(".complex-tree__items").length) {
            _t.parents(".complex-tree__item").toggleClass("complex-tree__item--open");
            _t.siblings(".complex-tree__items").fadeToggle(300);
          }
          e.preventDefault();
        });
      }
      if ($(".js-chat-tabs-btn").length) {
        var blockedChangeChatTab = false;
        $(".js-chat-tabs-btn").on("click", function (e) {
          var _t = $(this);
          var _tData = _t.data("tab-btn");
          var _tParent = _t.parents(".chat__tabs").first();
          var tabsBtns = _tParent.find("> .chat__tabs-controls .chat__tabs-controls-button");
          var tabsItems = _tParent.find("> .chat__tabs-items .chat__tabs-item");
          if (!_t.hasClass("chat__tabs-controls-button--active") && _tParent.find('.chat__tabs-item[data-tab-item="' + _tData + '"]').length && !blockedChangeChatTab) {
            blockedChangeChatTab = true;
            tabsBtns.removeClass("chat__tabs-controls-button--active");
            _t.addClass("chat__tabs-controls-button--active");
            tabsItems.fadeOut(0, function () {
              $(this).removeClass("tabs__item--active");
            });
            _tParent.find('.chat__tabs-item[data-tab-item="' + _tData + '"]').fadeIn(300, function () {
              $(this).removeClass("tabs__item--active");
              blockedChangeChatTab = false;
            });
          }
          e.preventDefault();
        });
      }
      if ($(".js-chat-search-toggle").length) {
        $(".js-chat-search-toggle").on("click", function (e) {
          var _tData = $(this).data("toggle");
          if ($(".chat__search").length) {
            if (_tData === "show") {
              $(".chat__search").addClass("show");
              return;
            }
            $(".chat__search").removeClass("show");
          }
          e.preventDefault();
        });
      }
      if ($(".js-task-statuses-input-focus").length) {
        $(".js-task-statuses-input-focus").on("focus", function () {
          var _t = $(this);
          var _tParent = _t.parents("[data-task-statuses-input-parent]").first();
          var _tParentDropdown = _tParent.find("[data-task-statuses-dropdown]").first();
          if ($(".task-search__dropdown .active[data-task-statuses-input-parent]").length) {
            $(".task-search__dropdown [data-task-statuses-input-parent]").removeClass("active");
            $(".task-search__dropdown [data-task-statuses-dropdown]").fadeOut(0);
          }
          _tParent.addClass("active");
          _tParentDropdown.fadeIn(300);
        });
      }
      if ($(".js-common-select").length) {
        var selectedItem = function selectedItem(text) {
          return "<div class=\"common-select__selected-item\">".concat(text, "\n\t\t\t\t\t\t<button class=\"common-select__selected-item-remove js-remove-selected-item\" type=\"button\"></button>\n\t\t\t\t\t</div>");
        };
        $(".js-common-select").each(function (index, item) {
          var _tParent = $(item);
          var _tParentWrap = _tParent.parents(".common-select-wrap");
          var _tText = _tParent.find(".common-select__text");
          var _tSelectedItems = _tParent.find(".common-select__selected-items");
          var _tToggleBtn = _tParent.find(".js-toggle-common-select");
          var _tResetBtn = _tParent.find(".js-reset-common-select");
          var _tDropdown = _tParent.find(".common-select__dropdown");
          var _tDropdownItemBtn = _tParent.find(".common-dropdown__list-href");
          function closeAllSelects() {
            if (!_tParent.hasClass("opened")) {
              if (_tParentWrap.length) {
                _tParentWrap.removeClass("active");
              }
              if ($(".common-select.opened").length) {
                $(".common-select.opened").removeClass("opened").find(".common-select__dropdown").fadeOut(0);
              }
            }
            if (_tParentWrap.length) {
              _tParentWrap.toggleClass("active");
            }
            _tParent.toggleClass("opened");
            _tDropdown.fadeToggle(0);
          }
          _tText.on("click", function (e) {
            closeAllSelects();
            e.preventDefault();
          });
          _tToggleBtn.on("click", function (e) {
            closeAllSelects();
            e.preventDefault();
          });
          _tResetBtn.on("click", function (e) {
            _tParentWrap.removeClass("active");
            _tParent.removeClass("not-empty opened");
            if (_tParent.find(".common-select__selected-item").length) {
              _tParent.find(".common-select__selected-item").remove();
            }
            _tText.text(_tText.data("placeholder"));
            _tDropdown.fadeOut(0);
            _tDropdownItemBtn.removeClass("common-dropdown__list-href--active");
            e.preventDefault();
          });
          _tDropdownItemBtn.on("click", function (e) {
            var _t = $(this);
            if (_tSelectedItems.length) {
              _tSelectedItems.append(selectedItem(_t.text()));
            } else {
              _tDropdownItemBtn.removeClass("common-dropdown__list-href--active");
              _t.addClass("common-dropdown__list-href--active");
              _tText.text(_t.text());
            }
            if (!_tParent.hasClass("not-empty")) {
              _tParent.addClass("not-empty");
            }
            _tParent.removeClass("opened");
            _tDropdown.fadeOut(0);
            e.preventDefault();
          });
        });
      }
      if ($(".js-mail-create-toggle").length) {
        $(".js-mail-create-toggle").on("click", function (e) {
          var _t = $(this);
          var _tParent = _t.parents(".mail");
          _tParent.toggleClass("mail--open-create");
          e.preventDefault();
        });
      }
      if ($(".js-mail-menu-toggle").length) {
        $(".js-mail-menu-toggle").on("click", function (e) {
          var _t = $(this);
          var _tParent = _t.parents(".mail");
          _tParent.toggleClass("mail--open-menu");
          e.preventDefault();
        });
      }
      if ($(".js-chat-menu-toggle").length) {
        $(".js-chat-menu-toggle").on("click", function (e) {
          var _t = $(this);
          var _tParent = _t.parents(".chat");
          _tParent.toggleClass("chat--open-menu");
          e.preventDefault();
        });
      }
      if ($(".record-table__item").length) {
        $(".record-table__item").on("click", function (e) {
          $body.addClass("order-visible");
          e.preventDefault();
        });
      }
      $(document).on("click", ".js-damage-marker-toggle", function (e) {
        var _t = $(this);
        _t.toggleClass("active");
        _t.siblings(".damage-marker__dropdown").fadeToggle(300);
        e.preventDefault();
      });
      $(document).on("click", ".js-remove-damage-marker", function (e) {
        $(this).parents(".damage-marker").remove();
        e.preventDefault();
      });
      $(document).on("click", ".js-remove-selected-item", function (e) {
        var _t = $(this);
        var _tParent = _t.parents(".common-select__selected-items");
        _t.parent().remove();
        if (!_tParent.children().length) {
          _tParent.parents(".common-select").removeClass("not-empty");
        }
        e.preventDefault();
      });
      $(document).on("click", ".js-delegate-mfp", function (e) {
        var attrHref = $(this).attr("href");
        if (attrHref) {
          $.magnificPopup.open({
            items: {
              src: attrHref
            },
            type: "inline",
            mainClass: "mfp-fade",
            closeOnBgClick: false
          }, 0);
        }
        e.preventDefault();
      });
      $(document).on("click", function (e) {
        if (!$(e.target).closest(".header__profile").length && $(".header__profile").hasClass("open-popup")) {
          $(".header__profile").removeClass("open-popup");
          $(".header__profile-popup").fadeOut(350);
          e.stopPropagation();
        }
        if (!$(e.target).closest(".main__btn").length && $(".main__btn").hasClass("active")) {
          $(".main__btn").removeClass("active");
          $(".main__btn .main__btn-dropdown").fadeOut(350);
          e.stopPropagation();
        }
        if (!$(e.target).closest(".main__summ").length && $(".main__summ").hasClass("active")) {
          $(".main__summ").removeClass("active");
          $(".main__summ .main__summ-dropdown").fadeOut(350);
          e.stopPropagation();
        }
        if (!$(e.target).closest(".filter-item").length && $(".filter-item").hasClass("active")) {
          $(".filter-item.active .filter-item__popup").fadeOut(350);
          $(".filter-item.active").removeClass("active");
          e.stopPropagation();
        }
        if (!$(e.target).closest(".form-search").length && $(".form-search").hasClass("form-search--not-empty") && $(".form-search__dropdown:visible")) {
          $(".form-search__dropdown").fadeOut(350);
          e.stopPropagation();
        }
        if (!$(e.target).closest(".table-settings__filter").length && $(".table-settings__filter-top").hasClass("table-settings__filter-top--open")) {
          $(".table-settings__filter-top").removeClass("table-settings__filter-top--open").siblings(".table-settings__filter-dropdown").fadeOut(350);
          e.stopPropagation();
        }
        if (!$(e.target).closest(".contractor").length && $(".contractor__cars-toggle").hasClass("active")) {
          $(".contractor__cars-toggle").removeClass("active");
          e.stopPropagation();
        }
        if (!$(e.target).closest(".js-more-toggle").length && $(".js-more-toggle").hasClass("active")) {
          $(".js-more-toggle.active").siblings("[data-dropdown]").fadeOut(350);
          $(".js-more-toggle.active").removeClass("active");
          e.stopPropagation();
        }
        if (!$(e.target).closest(".notif").length && !$(e.target).hasClass("js-notif-toggle") && $(".notif").length && $body.hasClass("notif-open")) {
          $(".notif").fadeOut(350);
          $body.removeClass("notif-open");
          e.stopPropagation();
        }
        if (!$(e.target).closest(".notif__setting").length && $(".notif__setting-btn").hasClass("notif__setting-btn--active")) {
          $(".notif__setting-btn").removeClass("notif__setting-btn--active");
          e.stopPropagation();
        }
        var targetClass = e.target.getAttribute && e.target.getAttribute("class");
        if (!$(e.target).closest(".common-dropdown").length && !$(e.target).hasClass("js-toggle-common-dropdown") && !(targetClass && targetClass.includes("datepicker")) && $(".js-toggle-common-dropdown").hasClass("active")) {
          var btnToggleDropdown = $(".js-toggle-common-dropdown");
          btnToggleDropdown.removeClass("active");
          btnToggleDropdown.parent().removeClass("active");
          btnToggleDropdown.siblings(".common-dropdown").fadeOut(300, function () {
            if (btnToggleDropdown.siblings(".common-dropdown").find(".table").length) {
              btnToggleDropdown.siblings(".common-dropdown").find(".table").css("opacity", "0");
            }
          });
          e.stopPropagation();
        }
        if (!$(e.target).closest(".tags-dropdown").length && !$(e.target).hasClass("js-toggle-tags-dropdown") && $(".js-toggle-tags-dropdown").hasClass("active")) {
          var btnToggleDropdown = $(".js-toggle-tags-dropdown");
          btnToggleDropdown.removeClass("active");
          btnToggleDropdown.parent().removeClass("active");
          btnToggleDropdown.siblings(".tags-dropdown").fadeOut(300);
          e.stopPropagation();
        }
        if (!$(e.target).hasClass("js-toggle-version-dropdown") && $(".js-toggle-version-dropdown").hasClass("active")) {
          var btnToggleDropdown = $(".js-toggle-version-dropdown");
          btnToggleDropdown.removeClass("active");
          btnToggleDropdown.parent().removeClass("active");
          btnToggleDropdown.siblings(".main__version-dropdown").fadeOut(300);
          e.stopPropagation();
        }
        if (!$(e.target).closest(".inspection-act__scheme-context").length && $(".inspection-act__scheme-context").hasClass("active")) {
          $(".inspection-act__scheme-context").removeClass("active").fadeOut(250, function () {
            $(this).removeAttr("style");
          });
          e.stopPropagation();
        }
        if (!$(e.target).closest(".common-select").length && $(".common-select").hasClass("opened")) {
          $(".common-select.opened").removeClass("opened").find(".common-select__dropdown").fadeOut(0);
          if ($(".common-select:not(.not-empty)").length && $(".common-select:not(.not-empty)").parents(".common-select-wrap").length) {
            $(".common-select").parents(".common-select-wrap").removeClass("active");
          }
          e.stopPropagation();
        }
        if (!$(e.target).closest(".chat__search").length && !$(e.target).closest(".js-chat-search-toggle").length && $(".chat__search").hasClass("show")) {
          $(".chat__search").removeClass("show");
          e.stopPropagation();
        }
        if (!$(e.target).closest(".task-search").length && $(".task-search").hasClass("active")) {
          $("[data-task-statuses-input-parent]").removeClass("active");
          $("[data-task-statuses-dropdown]").fadeOut(0);
          e.stopPropagation();
        }
        if ($(".task-search").hasClass("active") && !$(e.target).closest(".task-search__dropdown [data-task-statuses-input-parent]").length && $(".task-search__dropdown [data-task-statuses-input-parent]").hasClass("active")) {
          $(".task-search__dropdown [data-task-statuses-input-parent]").removeClass("active");
          $(".task-search__dropdown [data-task-statuses-dropdown]").fadeOut(0);
          e.stopPropagation();
        }
        if (!$(e.target).closest(".mail__create").length && !$(e.target).closest(".js-mail-create-toggle").length && $(".order .mail").hasClass("mail--open-create")) {
          $(".order .mail").removeClass("mail--open-create");
          e.stopPropagation();
        }
        if (!$(e.target).closest(".mail__menu-container").length && !$(e.target).closest(".js-mail-menu-toggle").length && $(".order .mail").hasClass("mail--open-menu")) {
          $(".order .mail").removeClass("mail--open-menu");
          e.stopPropagation();
        }
        if (!$(e.target).closest(".chat__menu-container").length && !$(e.target).closest(".js-chat-menu-toggle").length && $(".order .chat").hasClass("chat--open-menu")) {
          $(".order .chat").removeClass("chat--open-menu");
          e.stopPropagation();
        }
      });
      return this;
    }
  }.init();
});
//# sourceMappingURL=own.js.map
