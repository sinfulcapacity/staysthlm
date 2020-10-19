import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, f as featherSprite, a as space, e as element, t as text, q as query_selector_all, c as detach_dev, g as claim_space, h as claim_element, j as children, k as claim_text, l as add_location, m as attr_dev, n as insert_dev, o as append_dev, p as noop } from './client.a9700dba.js';

/* src\routes\contact.svelte generated by Svelte v3.29.0 */
var file = "src\\routes\\contact.svelte";

function create_fragment(ctx) {
  var t0;
  var div1;
  var div0;
  var h20;
  var t1;
  var t2;
  var t3;
  var div5;
  var div4;
  var div2;
  var h21;
  var t4;
  var t5;
  var p;
  var t6;
  var br;
  var t7;
  var t8;
  var div3;
  var ul;
  var li0;
  var strong0;
  var t9;
  var t10;
  var t11;
  var li1;
  var strong1;
  var t12;
  var t13;
  var t14;
  var li2;
  var strong2;
  var t15;
  var t16;
  var t17;
  var li3;
  var strong3;
  var t18;
  var t19;
  var t20;
  var li4;
  var strong4;
  var t21;
  var t22;
  var block = {
    c: function create() {
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      h20 = element("h2");
      t1 = text("Contact");
      t2 = text("\n    Always available!");
      t3 = space();
      div5 = element("div");
      div4 = element("div");
      div2 = element("div");
      h21 = element("h2");
      t4 = text("Would you like to know more about Stay Sthlm?");
      t5 = space();
      p = element("p");
      t6 = text("lease contact us directly to find out more about our services and our\n        portfolio of corporate apartments.");
      br = element("br");
      t7 = text("\n        If you are one of our tenants please contact us at support@staysthlm.se\n        directly");
      t8 = space();
      div3 = element("div");
      ul = element("ul");
      li0 = element("li");
      strong0 = element("strong");
      t9 = text("Our opeing hours:");
      t10 = text(" 9 am to 5 pm");
      t11 = space();
      li1 = element("li");
      strong1 = element("strong");
      t12 = text("Phone:");
      t13 = text(" + 46 (0) 8 410 337 80");
      t14 = space();
      li2 = element("li");
      strong2 = element("strong");
      t15 = text("Mail:");
      t16 = text(" info@staysthlm.se");
      t17 = space();
      li3 = element("li");
      strong3 = element("strong");
      t18 = text("Adress:");
      t19 = text(" Ranhammarsvägen 4 161 02 Bromma");
      t20 = space();
      li4 = element("li");
      strong4 = element("strong");
      t21 = text("Org:");
      t22 = text(" 556811-9977 (Stay in Sweden AB)");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1xyig7r\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      h20 = claim_element(div0_nodes, "H2", {});
      var h20_nodes = children(h20);
      t1 = claim_text(h20_nodes, "Contact");
      h20_nodes.forEach(detach_dev);
      t2 = claim_text(div0_nodes, "\n    Always available!");
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t3 = claim_space(nodes);
      div5 = claim_element(nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      div4 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      div2 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      h21 = claim_element(div2_nodes, "H2", {});
      var h21_nodes = children(h21);
      t4 = claim_text(h21_nodes, "Would you like to know more about Stay Sthlm?");
      h21_nodes.forEach(detach_dev);
      t5 = claim_space(div2_nodes);
      p = claim_element(div2_nodes, "P", {});
      var p_nodes = children(p);
      t6 = claim_text(p_nodes, "lease contact us directly to find out more about our services and our\n        portfolio of corporate apartments.");
      br = claim_element(p_nodes, "BR", {});
      t7 = claim_text(p_nodes, "\n        If you are one of our tenants please contact us at support@staysthlm.se\n        directly");
      p_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t8 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      ul = claim_element(div3_nodes, "UL", {});
      var ul_nodes = children(ul);
      li0 = claim_element(ul_nodes, "LI", {});
      var li0_nodes = children(li0);
      strong0 = claim_element(li0_nodes, "STRONG", {});
      var strong0_nodes = children(strong0);
      t9 = claim_text(strong0_nodes, "Our opeing hours:");
      strong0_nodes.forEach(detach_dev);
      t10 = claim_text(li0_nodes, " 9 am to 5 pm");
      li0_nodes.forEach(detach_dev);
      t11 = claim_space(ul_nodes);
      li1 = claim_element(ul_nodes, "LI", {});
      var li1_nodes = children(li1);
      strong1 = claim_element(li1_nodes, "STRONG", {});
      var strong1_nodes = children(strong1);
      t12 = claim_text(strong1_nodes, "Phone:");
      strong1_nodes.forEach(detach_dev);
      t13 = claim_text(li1_nodes, " + 46 (0) 8 410 337 80");
      li1_nodes.forEach(detach_dev);
      t14 = claim_space(ul_nodes);
      li2 = claim_element(ul_nodes, "LI", {});
      var li2_nodes = children(li2);
      strong2 = claim_element(li2_nodes, "STRONG", {});
      var strong2_nodes = children(strong2);
      t15 = claim_text(strong2_nodes, "Mail:");
      strong2_nodes.forEach(detach_dev);
      t16 = claim_text(li2_nodes, " info@staysthlm.se");
      li2_nodes.forEach(detach_dev);
      t17 = claim_space(ul_nodes);
      li3 = claim_element(ul_nodes, "LI", {});
      var li3_nodes = children(li3);
      strong3 = claim_element(li3_nodes, "STRONG", {});
      var strong3_nodes = children(strong3);
      t18 = claim_text(strong3_nodes, "Adress:");
      strong3_nodes.forEach(detach_dev);
      t19 = claim_text(li3_nodes, " Ranhammarsvägen 4 161 02 Bromma");
      li3_nodes.forEach(detach_dev);
      t20 = claim_space(ul_nodes);
      li4 = claim_element(ul_nodes, "LI", {});
      var li4_nodes = children(li4);
      strong4 = claim_element(li4_nodes, "STRONG", {});
      var strong4_nodes = children(strong4);
      t21 = claim_text(strong4_nodes, "Org:");
      strong4_nodes.forEach(detach_dev);
      t22 = claim_text(li4_nodes, " 556811-9977 (Stay in Sweden AB)");
      li4_nodes.forEach(detach_dev);
      ul_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "StaySthlm - Contact";
      add_location(h20, file, 77, 4, 1963);
      attr_dev(div0, "class", "hilight");
      add_location(div0, file, 76, 2, 1937);
      attr_dev(div1, "class", "banner co-banner");
      add_location(div1, file, 75, 0, 1904);
      add_location(h21, file, 85, 6, 2107);
      add_location(br, file, 88, 42, 2292);
      add_location(p, file, 86, 6, 2168);
      attr_dev(div2, "class", "info paragraph");
      add_location(div2, file, 84, 4, 2072);
      add_location(strong0, file, 95, 12, 2472);
      add_location(li0, file, 95, 8, 2468);
      add_location(strong1, file, 96, 12, 2538);
      add_location(li1, file, 96, 8, 2534);
      add_location(strong2, file, 97, 12, 2602);
      add_location(li2, file, 97, 8, 2598);
      add_location(strong3, file, 98, 12, 2661);
      add_location(li3, file, 98, 8, 2657);
      add_location(strong4, file, 99, 12, 2736);
      add_location(li4, file, 99, 8, 2732);
      add_location(ul, file, 94, 6, 2455);
      attr_dev(div3, "class", "contact-info");
      add_location(div3, file, 93, 4, 2422);
      attr_dev(div4, "class", "content");
      add_location(div4, file, 83, 2, 2046);
      attr_dev(div5, "class", "co-contact");
      add_location(div5, file, 82, 0, 2019);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, div1, anchor);
      append_dev(div1, div0);
      append_dev(div0, h20);
      append_dev(h20, t1);
      append_dev(div0, t2);
      insert_dev(target, t3, anchor);
      insert_dev(target, div5, anchor);
      append_dev(div5, div4);
      append_dev(div4, div2);
      append_dev(div2, h21);
      append_dev(h21, t4);
      append_dev(div2, t5);
      append_dev(div2, p);
      append_dev(p, t6);
      append_dev(p, br);
      append_dev(p, t7);
      append_dev(div4, t8);
      append_dev(div4, div3);
      append_dev(div3, ul);
      append_dev(ul, li0);
      append_dev(li0, strong0);
      append_dev(strong0, t9);
      append_dev(li0, t10);
      append_dev(ul, t11);
      append_dev(ul, li1);
      append_dev(li1, strong1);
      append_dev(strong1, t12);
      append_dev(li1, t13);
      append_dev(ul, t14);
      append_dev(ul, li2);
      append_dev(li2, strong2);
      append_dev(strong2, t15);
      append_dev(li2, t16);
      append_dev(ul, t17);
      append_dev(ul, li3);
      append_dev(li3, strong3);
      append_dev(strong3, t18);
      append_dev(li3, t19);
      append_dev(ul, t20);
      append_dev(ul, li4);
      append_dev(li4, strong4);
      append_dev(strong4, t21);
      append_dev(li4, t22);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div1);
      if (detaching) detach_dev(t3);
      if (detaching) detach_dev(div5);
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
  validate_slots("Contact", slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Contact> was created with unknown prop '" + key + "'");
  });

  $$self.$capture_state = () => ({
    featherSprite
  });

  return [];
}

class Contact extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Contact",
      options,
      id: create_fragment.name
    });
  }

}

export default Contact;
