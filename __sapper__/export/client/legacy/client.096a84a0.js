function noop() {}

function assign(tar, src) {
  // @ts-ignore
  for (var k in src) {
    tar[k] = src[k];
  }

  return tar;
}

function add_location(element, file, line, column, char) {
  element.__svelte_meta = {
    loc: {
      file,
      line,
      column,
      char
    }
  };
}

function run(fn) {
  return fn();
}

function blank_object() {
  return Object.create(null);
}

function run_all(fns) {
  fns.forEach(run);
}

function is_function(thing) {
  return typeof thing === 'function';
}

function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === 'object' || typeof a === 'function';
}

function is_empty(obj) {
  return Object.keys(obj).length === 0;
}

function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    var slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}

function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}

function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    var lets = definition[2](fn(dirty));

    if ($$scope.dirty === undefined) {
      return lets;
    }

    if (typeof lets === 'object') {
      var merged = [];
      var len = Math.max($$scope.dirty.length, lets.length);

      for (var i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }

      return merged;
    }

    return $$scope.dirty | lets;
  }

  return $$scope.dirty;
}

function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
  var slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);

  if (slot_changes) {
    var slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}

function append(target, node) {
  target.appendChild(node);
}

function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}

function detach(node) {
  node.parentNode.removeChild(node);
}

function element(name) {
  return document.createElement(name);
}

function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function text(data) {
  return document.createTextNode(data);
}

function space() {
  return text(' ');
}

function empty() {
  return text('');
}

function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}

function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

function xlink_attr(node, attribute, value) {
  node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}

function children(element) {
  return Array.from(element.childNodes);
}

function claim_element(nodes, name, attributes, svg) {
  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeName === name) {
      var j = 0;
      var remove = [];

      while (j < node.attributes.length) {
        var attribute = node.attributes[j++];

        if (!attributes[attribute.name]) {
          remove.push(attribute.name);
        }
      }

      for (var k = 0; k < remove.length; k++) {
        node.removeAttribute(remove[k]);
      }

      return nodes.splice(i, 1)[0];
    }
  }

  return svg ? svg_element(name) : element(name);
}

function claim_text(nodes, data) {
  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeType === 3) {
      node.data = '' + data;
      return nodes.splice(i, 1)[0];
    }
  }

  return text(data);
}

function claim_space(nodes) {
  return claim_text(nodes, ' ');
}

function custom_event(type, detail) {
  var e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, false, false, detail);
  return e;
}

function query_selector_all(selector, parent) {
  if (parent === void 0) {
    parent = document.body;
  }

  return Array.from(parent.querySelectorAll(selector));
}

var current_component;

function set_current_component(component) {
  current_component = component;
}

function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}

function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}

function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}

var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;

function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}

function add_render_callback(fn) {
  render_callbacks.push(fn);
}

var flushing = false;
var seen_callbacks = new Set();

function flush() {
  if (flushing) return;
  flushing = true;

  do {
    // first, call beforeUpdate functions
    // and update components
    for (var i = 0; i < dirty_components.length; i += 1) {
      var component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }

    set_current_component(null);
    dirty_components.length = 0;

    while (binding_callbacks.length) {
      binding_callbacks.pop()();
    } // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...


    for (var _i = 0; _i < render_callbacks.length; _i += 1) {
      var callback = render_callbacks[_i];

      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }

    render_callbacks.length = 0;
  } while (dirty_components.length);

  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }

  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}

function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    var dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}

var outroing = new Set();
var outros;

function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group

  };
}

function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }

  outros = outros.p;
}

function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}

function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);

      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}

var globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;

function get_spread_update(levels, updates) {
  var update = {};
  var to_null_out = {};
  var accounted_for = {
    $$scope: 1
  };
  var i = levels.length;

  while (i--) {
    var o = levels[i];
    var n = updates[i];

    if (n) {
      for (var key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }

      for (var _key3 in n) {
        if (!accounted_for[_key3]) {
          update[_key3] = n[_key3];
          accounted_for[_key3] = 1;
        }
      }

      levels[i] = n;
    } else {
      for (var _key4 in o) {
        accounted_for[_key4] = 1;
      }
    }
  }

  for (var _key5 in to_null_out) {
    if (!(_key5 in update)) update[_key5] = undefined;
  }

  return update;
}

function get_spread_object(spread_props) {
  return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
} // source: https://html.spec.whatwg.org/multipage/indices.html

function create_component(block) {
  block && block.c();
}

function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}

function mount_component(component, target, anchor) {
  var {
    fragment,
    on_mount,
    on_destroy,
    after_update
  } = component.$$;
  fragment && fragment.m(target, anchor); // onMount happens before the initial afterUpdate

  add_render_callback(() => {
    var new_on_destroy = on_mount.map(run).filter(is_function);

    if (on_destroy) {
      on_destroy.push(...new_on_destroy);
    } else {
      // Edge case - component was destroyed immediately,
      // most likely as a result of a binding initialising
      run_all(new_on_destroy);
    }

    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}

function destroy_component(component, detaching) {
  var $$ = component.$$;

  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)

    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}

function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }

  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}

function init(component, options, instance, create_fragment, not_equal, props, dirty) {
  if (dirty === void 0) {
    dirty = [-1];
  }

  var parent_component = current_component;
  set_current_component(component);
  var prop_values = options.props || {};
  var $$ = component.$$ = {
    fragment: null,
    ctx: null,
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : []),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false
  };
  var ready = false;
  $$.ctx = instance ? instance(component, prop_values, function (i, ret) {
    var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }

    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update); // `false` as a special case of no DOM component

  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

  if (options.target) {
    if (options.hydrate) {
      var nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }

    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }

  set_current_component(parent_component);
}

class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }

  $on(type, callback) {
    var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      var index = callbacks.indexOf(callback);
      if (index !== -1) callbacks.splice(index, 1);
    };
  }

  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }

}

function dispatch_dev(type, detail) {
  document.dispatchEvent(custom_event(type, Object.assign({
    version: '3.29.0'
  }, detail)));
}

function append_dev(target, node) {
  dispatch_dev("SvelteDOMInsert", {
    target,
    node
  });
  append(target, node);
}

function insert_dev(target, node, anchor) {
  dispatch_dev("SvelteDOMInsert", {
    target,
    node,
    anchor
  });
  insert(target, node, anchor);
}

function detach_dev(node) {
  dispatch_dev("SvelteDOMRemove", {
    node
  });
  detach(node);
}

function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
  var modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
  if (has_prevent_default) modifiers.push('preventDefault');
  if (has_stop_propagation) modifiers.push('stopPropagation');
  dispatch_dev("SvelteDOMAddEventListener", {
    node,
    event,
    handler,
    modifiers
  });
  var dispose = listen(node, event, handler, options);
  return () => {
    dispatch_dev("SvelteDOMRemoveEventListener", {
      node,
      event,
      handler,
      modifiers
    });
    dispose();
  };
}

function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null) dispatch_dev("SvelteDOMRemoveAttribute", {
    node,
    attribute
  });else dispatch_dev("SvelteDOMSetAttribute", {
    node,
    attribute,
    value
  });
}

function set_data_dev(text, data) {
  data = '' + data;
  if (text.wholeText === data) return;
  dispatch_dev("SvelteDOMSetData", {
    node: text,
    data
  });
  text.data = data;
}

function validate_slots(name, slot, keys) {
  for (var slot_key of Object.keys(slot)) {
    if (!~keys.indexOf(slot_key)) {
      console.warn("<" + name + "> received an unexpected slot \"" + slot_key + "\".");
    }
  }
}

class SvelteComponentDev extends SvelteComponent {
  constructor(options) {
    if (!options || !options.target && !options.$$inline) {
      throw new Error("'target' is a required option");
    }

    super();
  }

  $destroy() {
    super.$destroy();

    this.$destroy = () => {
      console.warn("Component was already destroyed"); // eslint-disable-line no-console
    };
  }

  $capture_state() {}

  $inject_state() {}

}

var subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */


function writable(value, start) {
  if (start === void 0) {
    start = noop;
  }

  var stop;
  var subscribers = [];

  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;

      if (stop) {
        // store is ready
        var run_queue = !subscriber_queue.length;

        for (var i = 0; i < subscribers.length; i += 1) {
          var s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }

        if (run_queue) {
          for (var _i = 0; _i < subscriber_queue.length; _i += 2) {
            subscriber_queue[_i][0](subscriber_queue[_i + 1]);
          }

          subscriber_queue.length = 0;
        }
      }
    }
  }

  function update(fn) {
    set(fn(value));
  }

  function subscribe(run, invalidate) {
    if (invalidate === void 0) {
      invalidate = noop;
    }

    var subscriber = [run, invalidate];
    subscribers.push(subscriber);

    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }

    run(value);
    return () => {
      var index = subscribers.indexOf(subscriber);

      if (index !== -1) {
        subscribers.splice(index, 1);
      }

      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }

  return {
    set,
    update,
    subscribe
  };
}

var CONTEXT_KEY = {};

var companyLogo = "/client/ee7f4c401cb04d48.jpg";

var featherSprite = "/client/96e876188e3e3e4a.svg";

/* src\components\Nav.svelte generated by Svelte v3.29.0 */
var file = "src\\components\\Nav.svelte";

function create_fragment(ctx) {
  var nav;
  var div3;
  var div0;
  var a0;
  var img;
  var img_src_value;
  var t0;
  var ul;
  var div1;
  var svg0;
  var use0;
  var use0_xlink_href_value;
  var t1;
  var li0;
  var a1;
  var t2;
  var a1_aria_current_value;
  var t3;
  var li1;
  var a2;
  var t4;
  var a2_aria_current_value;
  var t5;
  var li2;
  var a3;
  var t6;
  var a3_aria_current_value;
  var t7;
  var li3;
  var a4;
  var t8;
  var a4_aria_current_value;
  var t9;
  var li4;
  var a5;
  var t10;
  var a5_aria_current_value;
  var t11;
  var div2;
  var svg1;
  var use1;
  var use1_xlink_href_value;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      nav = element("nav");
      div3 = element("div");
      div0 = element("div");
      a0 = element("a");
      img = element("img");
      t0 = space();
      ul = element("ul");
      div1 = element("div");
      svg0 = svg_element("svg");
      use0 = svg_element("use");
      t1 = space();
      li0 = element("li");
      a1 = element("a");
      t2 = text("Home");
      t3 = space();
      li1 = element("li");
      a2 = element("a");
      t4 = text("Corporate apartments");
      t5 = space();
      li2 = element("li");
      a3 = element("a");
      t6 = text("Stay plus");
      t7 = space();
      li3 = element("li");
      a4 = element("a");
      t8 = text("Our team");
      t9 = space();
      li4 = element("li");
      a5 = element("a");
      t10 = text("Contact");
      t11 = space();
      div2 = element("div");
      svg1 = svg_element("svg");
      use1 = svg_element("use");
      this.h();
    },
    l: function claim(nodes) {
      nav = claim_element(nodes, "NAV", {
        class: true
      });
      var nav_nodes = children(nav);
      div3 = claim_element(nav_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      a0 = claim_element(div0_nodes, "A", {
        href: true
      });
      var a0_nodes = children(a0);
      img = claim_element(a0_nodes, "IMG", {
        alt: true,
        src: true
      });
      a0_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t0 = claim_space(div3_nodes);
      ul = claim_element(div3_nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);
      div1 = claim_element(ul_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      svg0 = claim_element(div1_nodes, "svg", {
        class: true
      }, 1);
      var svg0_nodes = children(svg0);
      use0 = claim_element(svg0_nodes, "use", {
        "xlink:href": true
      }, 1);
      children(use0).forEach(detach_dev);
      svg0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t1 = claim_space(ul_nodes);
      li0 = claim_element(ul_nodes, "LI", {});
      var li0_nodes = children(li0);
      a1 = claim_element(li0_nodes, "A", {
        "aria-current": true,
        href: true
      });
      var a1_nodes = children(a1);
      t2 = claim_text(a1_nodes, "Home");
      a1_nodes.forEach(detach_dev);
      li0_nodes.forEach(detach_dev);
      t3 = claim_space(ul_nodes);
      li1 = claim_element(ul_nodes, "LI", {});
      var li1_nodes = children(li1);
      a2 = claim_element(li1_nodes, "A", {
        "aria-current": true,
        href: true
      });
      var a2_nodes = children(a2);
      t4 = claim_text(a2_nodes, "Corporate apartments");
      a2_nodes.forEach(detach_dev);
      li1_nodes.forEach(detach_dev);
      t5 = claim_space(ul_nodes);
      li2 = claim_element(ul_nodes, "LI", {});
      var li2_nodes = children(li2);
      a3 = claim_element(li2_nodes, "A", {
        "aria-current": true,
        href: true
      });
      var a3_nodes = children(a3);
      t6 = claim_text(a3_nodes, "Stay plus");
      a3_nodes.forEach(detach_dev);
      li2_nodes.forEach(detach_dev);
      t7 = claim_space(ul_nodes);
      li3 = claim_element(ul_nodes, "LI", {});
      var li3_nodes = children(li3);
      a4 = claim_element(li3_nodes, "A", {
        "aria-current": true,
        href: true
      });
      var a4_nodes = children(a4);
      t8 = claim_text(a4_nodes, "Our team");
      a4_nodes.forEach(detach_dev);
      li3_nodes.forEach(detach_dev);
      t9 = claim_space(ul_nodes);
      li4 = claim_element(ul_nodes, "LI", {});
      var li4_nodes = children(li4);
      a5 = claim_element(li4_nodes, "A", {
        "aria-current": true,
        href: true
      });
      var a5_nodes = children(a5);
      t10 = claim_text(a5_nodes, "Contact");
      a5_nodes.forEach(detach_dev);
      li4_nodes.forEach(detach_dev);
      ul_nodes.forEach(detach_dev);
      t11 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      svg1 = claim_element(div2_nodes, "svg", {
        class: true
      }, 1);
      var svg1_nodes = children(svg1);
      use1 = claim_element(svg1_nodes, "use", {
        "xlink:href": true
      }, 1);
      children(use1).forEach(detach_dev);
      svg1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      nav_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(img, "alt", "StaySthlm");
      if (img.src !== (img_src_value = companyLogo)) attr_dev(img, "src", img_src_value);
      add_location(img, file, 165, 18, 4073);
      attr_dev(a0, "href", "/");
      add_location(a0, file, 165, 6, 4061);
      attr_dev(div0, "class", "logo");
      add_location(div0, file, 164, 4, 4035);
      xlink_attr(use0, "xlink:href", use0_xlink_href_value = "" + (featherSprite + "#x"));
      add_location(use0, file, 170, 10, 4269);
      attr_dev(svg0, "class", "feather");
      add_location(svg0, file, 169, 8, 4236);
      attr_dev(div1, "class", "icon cancel-btn");
      add_location(div1, file, 168, 6, 4166);
      attr_dev(a1, "aria-current", a1_aria_current_value =
      /*segment*/
      ctx[0] === undefined ? "page" : undefined);
      attr_dev(a1, "href", ".");
      add_location(a1, file, 174, 8, 4359);
      add_location(li0, file, 173, 6, 4345);
      attr_dev(a2, "aria-current", a2_aria_current_value =
      /*segment*/
      ctx[0] === "corporateApartments" ? "page" : undefined);
      attr_dev(a2, "href", "corporateApartments");
      add_location(a2, file, 179, 8, 4525);
      add_location(li1, file, 178, 6, 4511);
      attr_dev(a3, "aria-current", a3_aria_current_value =
      /*segment*/
      ctx[0] === "stayplus" ? "page" : undefined);
      attr_dev(a3, "href", "stayplus");
      add_location(a3, file, 184, 8, 4737);
      add_location(li2, file, 183, 6, 4723);
      attr_dev(a4, "aria-current", a4_aria_current_value =
      /*segment*/
      ctx[0] === "ourteam" ? "page" : undefined);
      attr_dev(a4, "href", "ourteam");
      add_location(a4, file, 189, 8, 4916);
      add_location(li3, file, 188, 6, 4902);
      attr_dev(a5, "aria-current", a5_aria_current_value =
      /*segment*/
      ctx[0] === "contact" ? "page" : undefined);
      attr_dev(a5, "href", "contact");
      add_location(a5, file, 194, 8, 5092);
      add_location(li4, file, 193, 6, 5078);
      attr_dev(ul, "class", "menu-list");
      add_location(ul, file, 167, 4, 4136);
      xlink_attr(use1, "xlink:href", use1_xlink_href_value = "" + (featherSprite + "#align-left"));
      add_location(use1, file, 201, 8, 5359);
      attr_dev(svg1, "class", "feather");
      add_location(svg1, file, 200, 6, 5328);
      attr_dev(div2, "class", "icon menu-btn");
      add_location(div2, file, 199, 4, 5262);
      attr_dev(div3, "class", "content");
      add_location(div3, file, 163, 2, 4008);
      attr_dev(nav, "class", "navbar");
      add_location(nav, file, 162, 0, 3984);
    },
    m: function mount(target, anchor) {
      insert_dev(target, nav, anchor);
      append_dev(nav, div3);
      append_dev(div3, div0);
      append_dev(div0, a0);
      append_dev(a0, img);
      append_dev(div3, t0);
      append_dev(div3, ul);
      append_dev(ul, div1);
      append_dev(div1, svg0);
      append_dev(svg0, use0);
      append_dev(ul, t1);
      append_dev(ul, li0);
      append_dev(li0, a1);
      append_dev(a1, t2);
      append_dev(ul, t3);
      append_dev(ul, li1);
      append_dev(li1, a2);
      append_dev(a2, t4);
      append_dev(ul, t5);
      append_dev(ul, li2);
      append_dev(li2, a3);
      append_dev(a3, t6);
      append_dev(ul, t7);
      append_dev(ul, li3);
      append_dev(li3, a4);
      append_dev(a4, t8);
      append_dev(ul, t9);
      append_dev(ul, li4);
      append_dev(li4, a5);
      append_dev(a5, t10);
      append_dev(div3, t11);
      append_dev(div3, div2);
      append_dev(div2, svg1);
      append_dev(svg1, use1);

      if (!mounted) {
        dispose = [listen_dev(div1, "click",
        /*onNavHideMobileMenu*/
        ctx[1], false, false, false), listen_dev(a1, "click",
        /*onNavHideMobileMenu*/
        ctx[1], false, false, false), listen_dev(a2, "click",
        /*onNavHideMobileMenu*/
        ctx[1], false, false, false), listen_dev(a3, "click",
        /*onNavHideMobileMenu*/
        ctx[1], false, false, false), listen_dev(a4, "click",
        /*onNavHideMobileMenu*/
        ctx[1], false, false, false), listen_dev(a5, "click",
        /*onNavHideMobileMenu*/
        ctx[1], false, false, false), listen_dev(div2, "click",
        /*onNavShowMobileMenu*/
        ctx[2], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var [dirty] = _ref;

      if (dirty &
      /*segment*/
      1 && a1_aria_current_value !== (a1_aria_current_value =
      /*segment*/
      ctx[0] === undefined ? "page" : undefined)) {
        attr_dev(a1, "aria-current", a1_aria_current_value);
      }

      if (dirty &
      /*segment*/
      1 && a2_aria_current_value !== (a2_aria_current_value =
      /*segment*/
      ctx[0] === "corporateApartments" ? "page" : undefined)) {
        attr_dev(a2, "aria-current", a2_aria_current_value);
      }

      if (dirty &
      /*segment*/
      1 && a3_aria_current_value !== (a3_aria_current_value =
      /*segment*/
      ctx[0] === "stayplus" ? "page" : undefined)) {
        attr_dev(a3, "aria-current", a3_aria_current_value);
      }

      if (dirty &
      /*segment*/
      1 && a4_aria_current_value !== (a4_aria_current_value =
      /*segment*/
      ctx[0] === "ourteam" ? "page" : undefined)) {
        attr_dev(a4, "aria-current", a4_aria_current_value);
      }

      if (dirty &
      /*segment*/
      1 && a5_aria_current_value !== (a5_aria_current_value =
      /*segment*/
      ctx[0] === "contact" ? "page" : undefined)) {
        attr_dev(a5, "aria-current", a5_aria_current_value);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(nav);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var {
    $$slots: slots = {},
    $$scope
  } = $$props;
  validate_slots("Nav", slots, []);
  var {
    segment
  } = $$props;

  var onNavHideMobileMenu = () => {
    var body = document.querySelector("body");
    var menuList = document.querySelector(".menu-list");
    body.classList.remove("disabled");
    menuList.classList.remove("show");
  };

  var onNavShowMobileMenu = () => {
    var body = document.querySelector("body");
    var menuList = document.querySelector(".menu-list");
    body.classList.remove("disabled");
    menuList.classList.add("show");
  };

  var writable_props = ["segment"];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Nav> was created with unknown prop '" + key + "'");
  });

  $$self.$$set = $$props => {
    if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
  };

  $$self.$capture_state = () => ({
    segment,
    companyLogo,
    featherSprite,
    onNavHideMobileMenu,
    onNavShowMobileMenu
  });

  $$self.$inject_state = $$props => {
    if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [segment, onNavHideMobileMenu, onNavShowMobileMenu];
}

class Nav extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance, create_fragment, safe_not_equal, {
      segment: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Nav",
      options,
      id: create_fragment.name
    });
    var {
      ctx
    } = this.$$;
    var props = options.props || {};

    if (
    /*segment*/
    ctx[0] === undefined && !("segment" in props)) {
      console.warn("<Nav> was created without expected prop 'segment'");
    }
  }

  get segment() {
    throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  set segment(value) {
    throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

}

/* src\components\GlobalStyle.svelte generated by Svelte v3.29.0 */

function create_fragment$1(ctx) {
  var block = {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}

function instance$1($$self, $$props) {
  var {
    $$slots: slots = {},
    $$scope
  } = $$props;
  validate_slots("GlobalStyle", slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<GlobalStyle> was created with unknown prop '" + key + "'");
  });
  return [];
}

class GlobalStyle extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "GlobalStyle",
      options,
      id: create_fragment$1.name
    });
  }

}

/* src\routes\_layout.svelte generated by Svelte v3.29.0 */
var file$1 = "src\\routes\\_layout.svelte";

function create_fragment$2(ctx) {
  var nav;
  var t0;
  var main;
  var globalstyle;
  var t1;
  var t2;
  var footer;
  var h3;
  var t3;
  var current;
  nav = new Nav({
    props: {
      segment:
      /*segment*/
      ctx[0]
    },
    $$inline: true
  });
  globalstyle = new GlobalStyle({
    $$inline: true
  });
  var default_slot_template =
  /*#slots*/
  ctx[2].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[1], null);
  var block = {
    c: function create() {
      create_component(nav.$$.fragment);
      t0 = space();
      main = element("main");
      create_component(globalstyle.$$.fragment);
      t1 = space();
      if (default_slot) default_slot.c();
      t2 = space();
      footer = element("footer");
      h3 = element("h3");
      t3 = text("© Copyright Stay in Sweden AB. - All Rights Reserved 2020");
      this.h();
    },
    l: function claim(nodes) {
      claim_component(nav.$$.fragment, nodes);
      t0 = claim_space(nodes);
      main = claim_element(nodes, "MAIN", {});
      var main_nodes = children(main);
      claim_component(globalstyle.$$.fragment, main_nodes);
      t1 = claim_space(main_nodes);
      if (default_slot) default_slot.l(main_nodes);
      main_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      footer = claim_element(nodes, "FOOTER", {});
      var footer_nodes = children(footer);
      h3 = claim_element(footer_nodes, "H3", {});
      var h3_nodes = children(h3);
      t3 = claim_text(h3_nodes, "© Copyright Stay in Sweden AB. - All Rights Reserved 2020");
      h3_nodes.forEach(detach_dev);
      footer_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(main, file$1, 26, 0, 890);
      add_location(h3, file$1, 32, 1, 954);
      add_location(footer, file$1, 31, 0, 943);
    },
    m: function mount(target, anchor) {
      mount_component(nav, target, anchor);
      insert_dev(target, t0, anchor);
      insert_dev(target, main, anchor);
      mount_component(globalstyle, main, null);
      append_dev(main, t1);

      if (default_slot) {
        default_slot.m(main, null);
      }

      insert_dev(target, t2, anchor);
      insert_dev(target, footer, anchor);
      append_dev(footer, h3);
      append_dev(h3, t3);
      current = true;
    },
    p: function update(ctx, _ref) {
      var [dirty] = _ref;
      var nav_changes = {};
      if (dirty &
      /*segment*/
      1) nav_changes.segment =
      /*segment*/
      ctx[0];
      nav.$set(nav_changes);

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        2) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[1], dirty, null, null);
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(nav.$$.fragment, local);
      transition_in(globalstyle.$$.fragment, local);
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(nav.$$.fragment, local);
      transition_out(globalstyle.$$.fragment, local);
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(nav, detaching);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(main);
      destroy_component(globalstyle);
      if (default_slot) default_slot.d(detaching);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(footer);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}

function instance$2($$self, $$props, $$invalidate) {
  var {
    $$slots: slots = {},
    $$scope
  } = $$props;
  validate_slots("Layout", slots, ['default']);
  var {
    segment
  } = $$props;
  var writable_props = ["segment"];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Layout> was created with unknown prop '" + key + "'");
  });

  $$self.$$set = $$props => {
    if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
    if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = () => ({
    Nav,
    GlobalStyle,
    segment
  });

  $$self.$inject_state = $$props => {
    if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [segment, $$scope, slots];
}

class Layout extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      segment: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Layout",
      options,
      id: create_fragment$2.name
    });
    var {
      ctx
    } = this.$$;
    var props = options.props || {};

    if (
    /*segment*/
    ctx[0] === undefined && !("segment" in props)) {
      console.warn("<Layout> was created without expected prop 'segment'");
    }
  }

  get segment() {
    throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  set segment(value) {
    throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

}

var root_comp = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Layout
});

/* src\routes\_error.svelte generated by Svelte v3.29.0 */
var {
  Error: Error_1
} = globals;
var file$2 = "src\\routes\\_error.svelte"; // (37:0) {#if dev && error.stack}

function create_if_block(ctx) {
  var pre;
  var t_value =
  /*error*/
  ctx[1].stack + "";
  var t;
  var block = {
    c: function create() {
      pre = element("pre");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      pre = claim_element(nodes, "PRE", {});
      var pre_nodes = children(pre);
      t = claim_text(pre_nodes, t_value);
      pre_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(pre, file$2, 37, 1, 1242);
    },
    m: function mount(target, anchor) {
      insert_dev(target, pre, anchor);
      append_dev(pre, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*error*/
      2 && t_value !== (t_value =
      /*error*/
      ctx[1].stack + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(pre);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block.name,
    type: "if",
    source: "(37:0) {#if dev && error.stack}",
    ctx
  });
  return block;
}

function create_fragment$3(ctx) {
  var title_value;
  var t0;
  var h1;
  var t1;
  var t2;
  var p;
  var t3_value =
  /*error*/
  ctx[1].message + "";
  var t3;
  var t4;
  var if_block_anchor;
  document.title = title_value =
  /*status*/
  ctx[0];
  var if_block =
  /*dev*/
  ctx[2] &&
  /*error*/
  ctx[1].stack && create_if_block(ctx);
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text(
      /*status*/
      ctx[0]);
      t2 = space();
      p = element("p");
      t3 = text(t3_value);
      t4 = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1o9r2ue\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes,
      /*status*/
      ctx[0]);
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t3 = claim_text(p_nodes, t3_value);
      p_nodes.forEach(detach_dev);
      t4 = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "svelte-d3folb");
      add_location(h1, file$2, 32, 0, 1168);
      attr_dev(p, "class", "svelte-d3folb");
      add_location(p, file$2, 34, 0, 1189);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, h1, anchor);
      append_dev(h1, t1);
      insert_dev(target, t2, anchor);
      insert_dev(target, p, anchor);
      append_dev(p, t3);
      insert_dev(target, t4, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var [dirty] = _ref;

      if (dirty &
      /*status*/
      1 && title_value !== (title_value =
      /*status*/
      ctx[0])) {
        document.title = title_value;
      }

      if (dirty &
      /*status*/
      1) set_data_dev(t1,
      /*status*/
      ctx[0]);
      if (dirty &
      /*error*/
      2 && t3_value !== (t3_value =
      /*error*/
      ctx[1].message + "")) set_data_dev(t3, t3_value);

      if (
      /*dev*/
      ctx[2] &&
      /*error*/
      ctx[1].stack) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(p);
      if (detaching) detach_dev(t4);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}

function instance$3($$self, $$props, $$invalidate) {
  var {
    $$slots: slots = {},
    $$scope
  } = $$props;
  validate_slots("Error", slots, []);
  var {
    status
  } = $$props;
  var {
    error
  } = $$props;
  var dev = "development" === "development";
  var writable_props = ["status", "error"];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Error> was created with unknown prop '" + key + "'");
  });

  $$self.$$set = $$props => {
    if ("status" in $$props) $$invalidate(0, status = $$props.status);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  $$self.$capture_state = () => ({
    status,
    error,
    dev
  });

  $$self.$inject_state = $$props => {
    if ("status" in $$props) $$invalidate(0, status = $$props.status);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [status, error, dev];
}

class Error$1 extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      status: 0,
      error: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Error",
      options,
      id: create_fragment$3.name
    });
    var {
      ctx
    } = this.$$;
    var props = options.props || {};

    if (
    /*status*/
    ctx[0] === undefined && !("status" in props)) {
      console.warn("<Error> was created without expected prop 'status'");
    }

    if (
    /*error*/
    ctx[1] === undefined && !("error" in props)) {
      console.warn("<Error> was created without expected prop 'error'");
    }
  }

  get status() {
    throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  set status(value) {
    throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  get error() {
    throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  set error(value) {
    throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

}

/* src\node_modules\@sapper\internal\App.svelte generated by Svelte v3.29.0 */
var {
  Error: Error_1$1
} = globals;

function create_else_block(ctx) {
  var switch_instance;
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [
  /*level1*/
  ctx[4].props];
  var switch_value =
  /*level1*/
  ctx[4].component;

  function switch_props(ctx) {
    var switch_instance_props = {};

    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }

    return {
      props: switch_instance_props,
      $$inline: true
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props());
  }

  var block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var switch_instance_changes = dirty &
      /*level1*/
      16 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
      /*level1*/
      ctx[4].props)]) : {};

      if (switch_value !== (switch_value =
      /*level1*/
      ctx[4].component)) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block.name,
    type: "else",
    source: "(23:1) {:else}",
    ctx
  });
  return block;
} // (21:1) {#if error}


function create_if_block$1(ctx) {
  var error_1;
  var current;
  error_1 = new Error$1({
    props: {
      error:
      /*error*/
      ctx[0],
      status:
      /*status*/
      ctx[1]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(error_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(error_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(error_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var error_1_changes = {};
      if (dirty &
      /*error*/
      1) error_1_changes.error =
      /*error*/
      ctx[0];
      if (dirty &
      /*status*/
      2) error_1_changes.status =
      /*status*/
      ctx[1];
      error_1.$set(error_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(error_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(error_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(error_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block$1.name,
    type: "if",
    source: "(21:1) {#if error}",
    ctx
  });
  return block;
} // (20:0) <Layout segment="{segments[0]}" {...level0.props}>


function create_default_slot(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$1, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*error*/
    ctx[0]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot.name,
    type: "slot",
    source: "(20:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
    ctx
  });
  return block;
}

function create_fragment$4(ctx) {
  var layout;
  var current;
  var layout_spread_levels = [{
    segment:
    /*segments*/
    ctx[2][0]
  },
  /*level0*/
  ctx[3].props];
  var layout_props = {
    $$slots: {
      default: [create_default_slot]
    },
    $$scope: {
      ctx
    }
  };

  for (var i = 0; i < layout_spread_levels.length; i += 1) {
    layout_props = assign(layout_props, layout_spread_levels[i]);
  }

  layout = new Layout({
    props: layout_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(layout.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(layout.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(layout, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var [dirty] = _ref;
      var layout_changes = dirty &
      /*segments, level0*/
      12 ? get_spread_update(layout_spread_levels, [dirty &
      /*segments*/
      4 && {
        segment:
        /*segments*/
        ctx[2][0]
      }, dirty &
      /*level0*/
      8 && get_spread_object(
      /*level0*/
      ctx[3].props)]) : {};

      if (dirty &
      /*$$scope, error, status, level1*/
      147) {
        layout_changes.$$scope = {
          dirty,
          ctx
        };
      }

      layout.$set(layout_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(layout.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(layout.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(layout, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$4.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}

function instance$4($$self, $$props, $$invalidate) {
  var {
    $$slots: slots = {},
    $$scope
  } = $$props;
  validate_slots("App", slots, []);
  var {
    stores
  } = $$props;
  var {
    error
  } = $$props;
  var {
    status
  } = $$props;
  var {
    segments
  } = $$props;
  var {
    level0
  } = $$props;
  var {
    level1 = null
  } = $$props;
  var {
    notify
  } = $$props;
  afterUpdate(notify);
  setContext(CONTEXT_KEY, stores);
  var writable_props = ["stores", "error", "status", "segments", "level0", "level1", "notify"];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<App> was created with unknown prop '" + key + "'");
  });

  $$self.$$set = $$props => {
    if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
    if ("status" in $$props) $$invalidate(1, status = $$props.status);
    if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
    if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
    if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
    if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
  };

  $$self.$capture_state = () => ({
    setContext,
    afterUpdate,
    CONTEXT_KEY,
    Layout,
    Error: Error$1,
    stores,
    error,
    status,
    segments,
    level0,
    level1,
    notify
  });

  $$self.$inject_state = $$props => {
    if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
    if ("status" in $$props) $$invalidate(1, status = $$props.status);
    if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
    if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
    if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
    if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [error, status, segments, level0, level1, stores, notify];
}

class App extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {
      stores: 5,
      error: 0,
      status: 1,
      segments: 2,
      level0: 3,
      level1: 4,
      notify: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "App",
      options,
      id: create_fragment$4.name
    });
    var {
      ctx
    } = this.$$;
    var props = options.props || {};

    if (
    /*stores*/
    ctx[5] === undefined && !("stores" in props)) {
      console.warn("<App> was created without expected prop 'stores'");
    }

    if (
    /*error*/
    ctx[0] === undefined && !("error" in props)) {
      console.warn("<App> was created without expected prop 'error'");
    }

    if (
    /*status*/
    ctx[1] === undefined && !("status" in props)) {
      console.warn("<App> was created without expected prop 'status'");
    }

    if (
    /*segments*/
    ctx[2] === undefined && !("segments" in props)) {
      console.warn("<App> was created without expected prop 'segments'");
    }

    if (
    /*level0*/
    ctx[3] === undefined && !("level0" in props)) {
      console.warn("<App> was created without expected prop 'level0'");
    }

    if (
    /*notify*/
    ctx[6] === undefined && !("notify" in props)) {
      console.warn("<App> was created without expected prop 'notify'");
    }
  }

  get stores() {
    throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  set stores(value) {
    throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  get error() {
    throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  set error(value) {
    throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  get status() {
    throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  set status(value) {
    throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  get segments() {
    throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  set segments(value) {
    throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  get level0() {
    throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  set level0(value) {
    throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  get level1() {
    throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  set level1(value) {
    throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  get notify() {
    throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  set notify(value) {
    throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

}

// This file is generated by Sapper — do not edit it!
var ignore = [];
var components = [{
  js: () => Promise.all([import('./index.20b122d7.js'), __inject_styles(["client-196967b3.css","index-09905f3c.css"])]).then(function(x) { return x[0]; })
}, {
  js: () => Promise.all([import('./corporateApartments.02a235ed.js'), __inject_styles(["client-196967b3.css","corporateApartments-cfbcaacb.css"])]).then(function(x) { return x[0]; })
}, {
  js: () => Promise.all([import('./stayplus.65bdad60.js'), __inject_styles(["client-196967b3.css"])]).then(function(x) { return x[0]; })
}, {
  js: () => Promise.all([import('./contact.f1f5a36e.js'), __inject_styles(["client-196967b3.css"])]).then(function(x) { return x[0]; })
}, {
  js: () => Promise.all([import('./ourteam.c8bbf1cc.js'), __inject_styles(["client-196967b3.css"])]).then(function(x) { return x[0]; })
}];
var routes = [{
  // index.svelte
  pattern: /^\/$/,
  parts: [{
    i: 0
  }]
}, {
  // corporateApartments.svelte
  pattern: /^\/corporateApartments\/?$/,
  parts: [{
    i: 1
  }]
}, {
  // stayplus.svelte
  pattern: /^\/stayplus\/?$/,
  parts: [{
    i: 2
  }]
}, {
  // contact.svelte
  pattern: /^\/contact\/?$/,
  parts: [{
    i: 3
  }]
}, {
  // ourteam.svelte
  pattern: /^\/ourteam\/?$/,
  parts: [{
    i: 4
  }]
}];

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function find_anchor(node) {
  while (node && node.nodeName.toUpperCase() !== 'A') {
    node = node.parentNode;
  } // SVG <a> elements have a lowercase name


  return node;
}

var uid = 1;

function set_uid(n) {
  uid = n;
}

var cid;

function set_cid(n) {
  cid = n;
}

var _history = typeof history !== 'undefined' ? history : {
  pushState: () => {},
  replaceState: () => {},
  scrollRestoration: 'auto'
};

var scroll_history = {};

function load_current_page() {
  return Promise.resolve().then(() => {
    var {
      hash,
      href
    } = location;

    _history.replaceState({
      id: uid
    }, '', href);

    var target = select_target(new URL(location.href));
    if (target) return navigate(target, uid, true, hash);
  });
}

var base_url;
var handle_target;

function init$1(base, handler) {
  base_url = base;
  handle_target = handler;

  if ('scrollRestoration' in _history) {
    _history.scrollRestoration = 'manual';
  } // Adopted from Nuxt.js
  // Reset scrollRestoration to auto when leaving page, allowing page reload
  // and back-navigation from other pages to use the browser to restore the
  // scrolling position.


  addEventListener('beforeunload', () => {
    _history.scrollRestoration = 'auto';
  }); // Setting scrollRestoration to manual again when returning to this page.

  addEventListener('load', () => {
    _history.scrollRestoration = 'manual';
  });
  addEventListener('click', handle_click);
  addEventListener('popstate', handle_popstate);
}

function extract_query(search) {
  var query = Object.create(null);

  if (search.length > 0) {
    search.slice(1).split('&').forEach(searchParam => {
      var [, key, value = ''] = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' ')));
      if (typeof query[key] === 'string') query[key] = [query[key]];
      if (typeof query[key] === 'object') query[key].push(value);else query[key] = value;
    });
  }

  return query;
}

function select_target(url) {
  if (url.origin !== location.origin) return null;
  if (!url.pathname.startsWith(base_url)) return null;
  var path = url.pathname.slice(base_url.length);

  if (path === '') {
    path = '/';
  } // avoid accidental clashes between server routes and page routes


  if (ignore.some(pattern => pattern.test(path))) return;

  for (var i = 0; i < routes.length; i += 1) {
    var route = routes[i];
    var match = route.pattern.exec(path);

    if (match) {
      var query = extract_query(url.search);
      var part = route.parts[route.parts.length - 1];
      var params = part.params ? part.params(match) : {};
      var page = {
        host: location.host,
        path,
        query,
        params
      };
      return {
        href: url.href,
        route,
        match,
        page
      };
    }
  }
}

function handle_click(event) {
  // Adapted from https://github.com/visionmedia/page.js
  // MIT license https://github.com/visionmedia/page.js#license
  if (which(event) !== 1) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (event.defaultPrevented) return;
  var a = find_anchor(event.target);
  if (!a) return;
  if (!a.href) return; // check if link is inside an svg
  // in this case, both href and target are always inside an object

  var svg = typeof a.href === 'object' && a.href.constructor.name === 'SVGAnimatedString';
  var href = String(svg ? a.href.baseVal : a.href);

  if (href === location.href) {
    if (!location.hash) event.preventDefault();
    return;
  } // Ignore if tag has
  // 1. 'download' attribute
  // 2. rel='external' attribute


  if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return; // Ignore if <a> has a target

  if (svg ? a.target.baseVal : a.target) return;
  var url = new URL(href); // Don't handle hash changes

  if (url.pathname === location.pathname && url.search === location.search) return;
  var target = select_target(url);

  if (target) {
    var noscroll = a.hasAttribute('sapper:noscroll');
    navigate(target, null, noscroll, url.hash);
    event.preventDefault();

    _history.pushState({
      id: cid
    }, '', url.href);
  }
}

function which(event) {
  return event.which === null ? event.button : event.which;
}

function scroll_state() {
  return {
    x: pageXOffset,
    y: pageYOffset
  };
}

function handle_popstate(event) {
  scroll_history[cid] = scroll_state();

  if (event.state) {
    var url = new URL(location.href);

    var _target = select_target(url);

    if (_target) {
      navigate(_target, event.state.id);
    } else {
      // eslint-disable-next-line
      location.href = location.href; // nosonar
    }
  } else {
    // hashchange
    set_uid(uid + 1);
    set_cid(uid);

    _history.replaceState({
      id: cid
    }, '', location.href);
  }
}

function navigate(dest, id, noscroll, hash) {
  return __awaiter(this, void 0, void 0, function* () {
    var popstate = !!id;

    if (popstate) {
      cid = id;
    } else {
      var current_scroll = scroll_state(); // clicked on a link. preserve scroll state

      scroll_history[cid] = current_scroll;
      cid = id = ++uid;
      scroll_history[cid] = noscroll ? current_scroll : {
        x: 0,
        y: 0
      };
    }

    yield handle_target(dest);
    if (document.activeElement && document.activeElement instanceof HTMLElement) document.activeElement.blur();

    if (!noscroll) {
      var scroll = scroll_history[id];
      var deep_linked;

      if (hash) {
        // scroll is an element id (from a hash), we need to compute y.
        deep_linked = document.getElementById(hash.slice(1));

        if (deep_linked) {
          scroll = {
            x: 0,
            y: deep_linked.getBoundingClientRect().top + scrollY
          };
        }
      }

      scroll_history[cid] = scroll;

      if (popstate || deep_linked) {
        scrollTo(scroll.x, scroll.y);
      } else {
        scrollTo(0, 0);
      }
    }
  });
}

function get_base_uri(window_document) {
  var baseURI = window_document.baseURI;

  if (!baseURI) {
    var baseTags = window_document.getElementsByTagName('base');
    baseURI = baseTags.length ? baseTags[0].href : window_document.URL;
  }

  return baseURI;
}

var prefetching = null;
var mousemove_timeout;

function start() {
  addEventListener('touchstart', trigger_prefetch);
  addEventListener('mousemove', handle_mousemove);
}

function prefetch(href) {
  var target = select_target(new URL(href, get_base_uri(document)));

  if (target) {
    if (!prefetching || href !== prefetching.href) {
      prefetching = {
        href,
        promise: hydrate_target(target)
      };
    }

    return prefetching.promise;
  }
}

function get_prefetched(target) {
  if (prefetching && prefetching.href === target.href) {
    return prefetching.promise;
  } else {
    return hydrate_target(target);
  }
}

function trigger_prefetch(event) {
  var a = find_anchor(event.target);

  if (a && a.rel === 'prefetch') {
    prefetch(a.href);
  }
}

function handle_mousemove(event) {
  clearTimeout(mousemove_timeout);
  mousemove_timeout = setTimeout(() => {
    trigger_prefetch(event);
  }, 20);
}

function goto(href, opts) {
  if (opts === void 0) {
    opts = {
      noscroll: false,
      replaceState: false
    };
  }

  var target = select_target(new URL(href, get_base_uri(document)));

  if (target) {
    _history[opts.replaceState ? 'replaceState' : 'pushState']({
      id: cid
    }, '', href);

    return navigate(target, null, opts.noscroll);
  }

  location.href = href;
  return new Promise(() => {
    /* never resolves */
  });
}

function page_store(value) {
  var store = writable(value);
  var ready = true;

  function notify() {
    ready = true;
    store.update(val => val);
  }

  function set(new_value) {
    ready = false;
    store.set(new_value);
  }

  function subscribe(run) {
    var old_value;
    return store.subscribe(new_value => {
      if (old_value === undefined || ready && new_value !== old_value) {
        run(old_value = new_value);
      }
    });
  }

  return {
    notify,
    set,
    subscribe
  };
}

var initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
var ready = false;
var root_component;
var current_token;
var root_preloaded;
var current_branch = [];
var current_query = '{}';
var stores = {
  page: page_store({}),
  preloading: writable(null),
  session: writable(initial_data && initial_data.session)
};
var $session;
var session_dirty;
stores.session.subscribe(value => __awaiter(void 0, void 0, void 0, function* () {
  $session = value;
  if (!ready) return;
  session_dirty = true;
  var dest = select_target(new URL(location.href));
  var token = current_token = {};
  var {
    redirect,
    props,
    branch
  } = yield hydrate_target(dest);
  if (token !== current_token) return; // a secondary navigation happened while we were loading

  if (redirect) {
    yield goto(redirect.location, {
      replaceState: true
    });
  } else {
    yield render(branch, props, buildPageContext(props, dest.page));
  }
}));
var target;

function set_target(node) {
  target = node;
}

function start$1(opts) {
  set_target(opts.target);
  init$1(initial_data.baseUrl, handle_target$1);
  start();

  if (initial_data.error) {
    return Promise.resolve().then(() => {
      return handle_error();
    });
  }

  return load_current_page();
}

function handle_error() {
  var {
    host,
    pathname,
    search
  } = location;
  var {
    session,
    preloaded,
    status,
    error
  } = initial_data;

  if (!root_preloaded) {
    root_preloaded = preloaded && preloaded[0];
  }

  var props = {
    error,
    status,
    session,
    level0: {
      props: root_preloaded
    },
    level1: {
      props: {
        status,
        error
      },
      component: Error$1
    },
    segments: preloaded
  };
  var query = extract_query(search);
  render([], props, {
    host,
    path: pathname,
    query,
    params: {},
    error
  });
}

function buildPageContext(props, page) {
  var {
    error
  } = props;
  return Object.assign({
    error
  }, page);
}

function handle_target$1(dest) {
  return __awaiter(this, void 0, void 0, function* () {
    if (root_component) stores.preloading.set(true);
    var hydrating = get_prefetched(dest);
    var token = current_token = {};
    var hydrated_target = yield hydrating;
    var {
      redirect
    } = hydrated_target;
    if (token !== current_token) return; // a secondary navigation happened while we were loading

    if (redirect) {
      yield goto(redirect.location, {
        replaceState: true
      });
    } else {
      var {
        props,
        branch
      } = hydrated_target;
      yield render(branch, props, buildPageContext(props, dest.page));
    }
  });
}

function render(branch, props, page) {
  return __awaiter(this, void 0, void 0, function* () {
    stores.page.set(page);
    stores.preloading.set(false);

    if (root_component) {
      root_component.$set(props);
    } else {
      props.stores = {
        page: {
          subscribe: stores.page.subscribe
        },
        preloading: {
          subscribe: stores.preloading.subscribe
        },
        session: stores.session
      };
      props.level0 = {
        props: yield root_preloaded
      };
      props.notify = stores.page.notify;
      root_component = new App({
        target,
        props,
        hydrate: true
      });
    }

    current_branch = branch;
    current_query = JSON.stringify(page.query);
    ready = true;
    session_dirty = false;
  });
}

function part_changed(i, segment, match, stringified_query) {
  // TODO only check query string changes for preload functions
  // that do in fact depend on it (using static analysis or
  // runtime instrumentation)
  if (stringified_query !== current_query) return true;
  var previous = current_branch[i];
  if (!previous) return false;
  if (segment !== previous.segment) return true;

  if (previous.match) {
    if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
      return true;
    }
  }
}

function hydrate_target(dest) {
  return __awaiter(this, void 0, void 0, function* () {
    var {
      route,
      page
    } = dest;
    var segments = page.path.split('/').filter(Boolean);
    var _redirect = null;
    var props = {
      error: null,
      status: 200,
      segments: [segments[0]]
    };
    var preload_context = {
      fetch: function (_fetch) {
        function fetch(_x, _x2) {
          return _fetch.apply(this, arguments);
        }

        fetch.toString = function () {
          return _fetch.toString();
        };

        return fetch;
      }((url, opts) => fetch(url, opts)),
      redirect: (statusCode, location) => {
        if (_redirect && (_redirect.statusCode !== statusCode || _redirect.location !== location)) {
          throw new Error('Conflicting redirects');
        }

        _redirect = {
          statusCode,
          location
        };
      },
      error: (status, _error) => {
        props.error = typeof _error === 'string' ? new Error(_error) : _error;
        props.status = status;
      }
    };

    if (!root_preloaded) {
      var root_preload = undefined || (() => ({}));

      root_preloaded = initial_data.preloaded[0] || root_preload.call(preload_context, {
        host: page.host,
        path: page.path,
        query: page.query,
        params: {}
      }, $session);
    }

    var branch;
    var l = 1;

    try {
      var stringified_query = JSON.stringify(page.query);
      var match = route.pattern.exec(page.path);
      var segment_dirty = false;
      branch = yield Promise.all(route.parts.map((part, i) => __awaiter(this, void 0, void 0, function* () {
        var segment = segments[i];
        if (part_changed(i, segment, match, stringified_query)) segment_dirty = true;
        props.segments[l] = segments[i + 1]; // TODO make this less confusing

        if (!part) return {
          segment
        };
        var j = l++;

        if (!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i) {
          return current_branch[i];
        }

        segment_dirty = false;
        var {
          default: component,
          preload
        } = yield components[part.i].js();
        var preloaded;

        if (ready || !initial_data.preloaded[i + 1]) {
          preloaded = preload ? yield preload.call(preload_context, {
            host: page.host,
            path: page.path,
            query: page.query,
            params: part.params ? part.params(dest.match) : {}
          }, $session) : {};
        } else {
          preloaded = initial_data.preloaded[i + 1];
        }

        return props["level" + j] = {
          component,
          props: preloaded,
          segment,
          match,
          part: part.i
        };
      })));
    } catch (error) {
      props.error = error;
      props.status = 500;
      branch = [];
    }

    return {
      redirect: _redirect,
      props,
      branch
    };
  });
}

start$1({
  target: document.querySelector('#sapper')
});

export { SvelteComponentDev as S, space as a, svg_element as b, detach_dev as c, dispatch_dev as d, element as e, featherSprite as f, claim_space as g, claim_element as h, init as i, children as j, claim_text as k, attr_dev as l, add_location as m, insert_dev as n, append_dev as o, noop as p, query_selector_all as q, safe_not_equal as s, text as t, validate_slots as v, xlink_attr as x };

import __inject_styles from './inject_styles.fe622066.js';