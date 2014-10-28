/* ========================================================================
 * bootstrap-switch - v2.0.1
 * http://www.bootstrap-switch.org
 * ========================================================================
 * Copyleft 2012-2013 Mattia Larentis
 * RTL Version By Keenthemes
 * ========================================================================
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================================
 */

(function() {
  (function($) {
    $.fn.bootstrapSwitch = function(method) {
      var methods;
      methods = {
        init: function() {
          return this.each(function() {
            var $div, $element, $form, $label, $switchright, $switchleft, $wrapper, changeState;
            $element = $(this);
            $switchright = $("<span>", {
              "class": "switch-right",
              html: function() {
                var html, label;
                html = "ON";
                label = $element.data("on-label");
                if (label != null) {
                  html = label;
                }
                return html;
              }
            });
            $switchleft = $("<span>", {
              "class": "switch-left",
              html: function() {
                var html, label;
                html = "OFF";
                label = $element.data("off-label");
                if (label != null) {
                  html = label;
                }
                return html;
              }
            });
            $label = $("<label>", {
              "for": $element.attr("id"),
              html: function() {
                var html, icon, label;
                html = "&nbsp;";
                icon = $element.data("label-icon");
                label = $element.data("text-label");
                if (icon != null) {
                  html = "<i class=\"icon " + icon + "\"></i>";
                }
                if (label != null) {
                  html = label;
                }
                return html;
              }
            });
            $div = $("<div>");
            $wrapper = $("<div>", {
              "class": "has-switch",
              tabindex: 0
            });
            $form = $element.closest("form");
            changeState = function() {
              if ($label.hasClass("label-change-switch")) {
                return;
              }
              return $label.trigger("mousedown").trigger("mouseup").trigger("click");
            };
            $element.data("bootstrap-switch", true);
            if ($element.data("on") != null) {
              $switchright.addClass("switch-" + $element.data("on"));
            }
            if ($element.data("off") != null) {
              $switchleft.addClass("switch-" + $element.data("off"));
            }
            $wrapper.data("animated", false);
            if ($element.data("animated") !== false) {
              $wrapper.addClass("switch-animate").data("animated", true);
            }
            $div = $element.wrap($div).parent();
            $wrapper = $div.wrap($wrapper).parent();
            if ($element.attr("class")) {
              $.each(["switch-mini", "switch-small", "switch-large"], function(i, cls) {
                if ($element.attr("class").indexOf(cls) >= 0) {
                  return $wrapper.addClass(cls);
                }
              });
            }
            $element.before($switchright).before($label).before($switchleft);
            $wrapper.addClass($element.is(":checked") ? "switch-on" : "switch-off");
            if ($element.is(":disabled") || $element.is("[readonly]")) {
              $wrapper.addClass("disabled");
            }
            $element.on("keydown", function(e) {
              if (e.keyCode !== 32) {
                return;
              }
              e.stopImmediatePropagation();
              e.preventDefault();
              return changeState();
            }).on("change", function(e, skip) {
              var isChecked, state;
              isChecked = $element.is(":checked");
              state = $wrapper.hasClass("switch-off");
              e.preventDefault();
              $div.css("right", "");
              if (state !== isChecked) {
                return;
              }
              if (isChecked) {
                $wrapper.removeClass("switch-off").addClass("switch-on");
              } else {
                $wrapper.removeClass("switch-on").addClass("switch-off");
              }
              if ($wrapper.data("animated") !== false) {
                $wrapper.addClass("switch-animate");
              }
              if (typeof skip === "boolean" && skip) {
                return;
              }
              return $element.trigger("switch-change", {
                el: $element,
                value: isChecked
              });
            });
            $wrapper.on("keydown", function(e) {
              if (!e.which || $element.is(":disabled") || $element.is("[readonly]")) {
                return;
              }
              switch (e.which) {
                case 32:
                  e.preventDefault();
                  return changeState();
                case 37:
                  e.preventDefault();
                  if ($element.is(":checked")) {
                    return changeState();
                  }
                  break;
                case 39:
                  e.preventDefault();
                  if (!$element.is(":checked")) {
                    return changeState();
                  }
              }
            });
            $switchright.on("click", function() {
              return changeState();
            });
            $switchleft.on("click", function() {
              return changeState();
            });
            $label.on("mousedown touchstart", function(e) {
              var moving;
              moving = false;
              e.preventDefault();
              e.stopImmediatePropagation();
              $wrapper.removeClass("switch-animate");
              if ($element.is(":disabled") || $element.is("[readonly]") || $element.hasClass("radio-no-uncheck")) {
                return $label.unbind("click");
              }
              return $label.on("mousemove touchmove", function(e) {
                var right, percent, relativeX, left;
                relativeX = (e.pageX || e.originalEvent.targetTouches[0].pageX) - $wrapper.offset().right;
                percent = (relativeX / $wrapper.width()) * 100;
                right = 25;
                left = 75;
                moving = true;
                if (percent < right) {
                  percent = right;
                } else if (percent > left) {
                  percent = left;
                }
                return $div.css("right", (percent - left) + "%");
              }).on("click touchend", function(e) {
                e.stopImmediatePropagation();
                e.preventDefault();
                $label.unbind("mouseleave");
                if (moving) {
                  $element.prop("checked", parseInt($label.parent().css("right"), 10) > -25);
                } else {
                  $element.prop("checked", !$element.is(":checked"));
                }
                moving = false;
                return $element.trigger("change");
              }).on("mouseleave", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                $label.unbind("mouseleave mousemove").trigger("mouseup");
                return $element.prop("checked", parseInt($label.parent().css("right"), 10) > -25).trigger("change");
              }).on("mouseup", function(e) {
                e.stopImmediatePropagation();
                e.preventDefault();
                return $label.trigger("mouseleave");
              });
            });
            if (!$form.data("bootstrap-switch")) {
              return $form.bind("reset", function() {
                return window.setTimeout(function() {
                  return $form.find(".has-switch").each(function() {
                    var $input;
                    $input = $(this).find("input");
                    return $input.prop("checked", $input.is(":checked")).trigger("change");
                  });
                }, 1);
              }).data("bootstrap-switch", true);
            }
          });
        },
        setDisabled: function(disabled) {
          var $element, $wrapper;
          $element = $(this);
          $wrapper = $element.parents(".has-switch");
          if (disabled) {
            $wrapper.addClass("disabled");
            $element.prop("disabled", true);
          } else {
            $wrapper.removeClass("disabled");
            $element.prop("disabled", false);
          }
          return $element;
        },
        toggleDisabled: function() {
          var $element;
          $element = $(this);
          $element.prop("disabled", !$element.is(":disabled")).parents(".has-switch").toggleClass("disabled");
          return $element;
        },
        isDisabled: function() {
          return $(this).is(":disabled");
        },
        setReadOnly: function(readonly) {
          var $element, $wrapper;
          $element = $(this);
          $wrapper = $element.parents(".has-switch");
          if (readonly) {
            $wrapper.addClass("disabled");
            $element.prop("readonly", true);
          } else {
            $wrapper.removeClass("disabled");
            $element.prop("readonly", false);
          }
          return $element;
        },
        toggleReadOnly: function() {
          var $element;
          $element = $(this);
          $element.prop("readonly", !$element.is("[readonly]")).parents(".has-switch").toggleClass("disabled");
          return $element;
        },
        isReadOnly: function() {
          return $(this).is("[readonly]");
        },
        toggleState: function(skip) {
          var $element;
          $element = $(this);
          $element.prop("checked", !$element.is(":checked")).trigger("change", skip);
          return $element;
        },
        toggleRadioState: function(skip) {
          var $element;
          $element = $(this);
          $element.not(":checked").prop("checked", !$element.is(":checked")).trigger("change", skip);
          return $element;
        },
        toggleRadioStateAllowUncheck: function(uncheck, skip) {
          var $element;
          $element = $(this);
          if (uncheck) {
            $element.not(":checked").trigger("change", skip);
          } else {
            $element.not(":checked").prop("checked", !$element.is(":checked")).trigger("change", skip);
          }
          return $element;
        },
        setState: function(value, skip) {
          var $element;
          $element = $(this);
          $element.prop("checked", value).trigger("change", skip);
          return $element;
        },
        setOnLabel: function(value) {
          var $element;
          $element = $(this);
          $element.siblings(".switch-right").html(value);
          return $element;
        },
        setOffLabel: function(value) {
          var $element;
          $element = $(this);
          $element.siblings(".switch-left").html(value);
          return $element;
        },
        setOnClass: function(value) {
          var $element, $switchright, cls;
          $element = $(this);
          $switchright = $element.siblings(".switch-right");
          cls = $element.attr("data-on");
          if (value == null) {
            return;
          }
          if (cls != null) {
            $switchright.removeClass("switch-" + cls);
          }
          $switchright.addClass("switch-" + value);
          return $element;
        },
        setOffClass: function(value) {
          var $element, $switchleft, cls;
          $element = $(this);
          $switchleft = $element.siblings(".switch-left");
          cls = $element.attr("data-off");
          if (value == null) {
            return;
          }
          if (cls != null) {
            $switchleft.removeClass("switch-" + cls);
          }
          $switchleft.addClass("switch-" + value);
          return $element;
        },
        setAnimated: function(value) {
          var $element, $wrapper;
          $element = $(this);
          $wrapper = $element.parents(".has-switch");
          if (value == null) {
            value = false;
          }
          $wrapper.data("animated", value).attr("data-animated", value)[$wrapper.data("animated") !== false ? "addClass" : "removeClass"]("switch-animate");
          return $element;
        },
        setSizeClass: function(value) {
          var $element, $wrapper;
          $element = $(this);
          $wrapper = $element.parents(".has-switch");
          $.each(["switch-mini", "switch-small", "switch-large"], function(i, cls) {
            return $wrapper[cls !== value ? "removeClass" : "addClass"](cls);
          });
          return $element;
        },
        setTextLabel: function(value) {
          var $element;
          $element = $(this);
          $element.siblings("label").html(value || "&nbsp");
          return $element;
        },
        setTextIcon: function(value) {
          var $element;
          $element = $(this);
          $element.siblings("label").html(value ? "<i class=\"icon " + value + "\"></i>" : "&nbsp;");
          return $element;
        },
        state: function() {
          return $(this).is(":checked");
        },
        destroy: function() {
          var $div, $element, $form;
          $element = $(this);
          $div = $element.parent();
          $form = $div.closest("form");
          $div.children().not($element).remove();
          $element.unwrap().unwrap().off("change");
          if ($form.length) {
            $form.off("reset").removeData("bootstrap-switch");
          }
          return $element;
        }
      };
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      }
      if (typeof method === "object" || !method) {
        return methods.init.apply(this, arguments);
      }
      return $.error("Method " + method + " does not exist!");
    };
    return this;
  })(jQuery);

}).call(this);
