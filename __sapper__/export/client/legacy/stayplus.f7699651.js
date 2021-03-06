import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, f as featherSprite, a as space, e as element, t as text, b as svg_element, q as query_selector_all, c as detach_dev, g as claim_space, h as claim_element, j as children, k as claim_text, l as add_location, m as attr_dev, x as xlink_attr, n as insert_dev, o as append_dev, p as noop } from './client.a9700dba.js';

/* src\routes\stayplus.svelte generated by Svelte v3.29.0 */
var file = "src\\routes\\stayplus.svelte";

function create_fragment(ctx) {
  var t0;
  var div1;
  var div0;
  var h20;
  var t1;
  var t2;
  var t3;
  var div5;
  var div2;
  var svg0;
  var use0;
  var use0_xlink_href_value;
  var t4;
  var h21;
  var t5;
  var t6;
  var div3;
  var svg1;
  var use1;
  var use1_xlink_href_value;
  var t7;
  var h22;
  var t8;
  var t9;
  var div4;
  var svg2;
  var use2;
  var use2_xlink_href_value;
  var t10;
  var h23;
  var t11;
  var t12;
  var div20;
  var div19;
  var div9;
  var div6;
  var h24;
  var t13;
  var t14;
  var p;
  var t15;
  var br;
  var t16;
  var t17;
  var div8;
  var img;
  var img_src_value;
  var t18;
  var div7;
  var t19;
  var t20;
  var div18;
  var div11;
  var h25;
  var t21;
  var t22;
  var div10;
  var t23;
  var t24;
  var div13;
  var h26;
  var t25;
  var t26;
  var div12;
  var t27;
  var t28;
  var div15;
  var h27;
  var t29;
  var t30;
  var div14;
  var t31;
  var t32;
  var div17;
  var h28;
  var t33;
  var t34;
  var div16;
  var t35;
  var block = {
    c: function create() {
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      h20 = element("h2");
      t1 = text("StayPlus");
      t2 = text("\n    Additional services");
      t3 = space();
      div5 = element("div");
      div2 = element("div");
      svg0 = svg_element("svg");
      use0 = svg_element("use");
      t4 = space();
      h21 = element("h2");
      t5 = text("Cleaning services");
      t6 = space();
      div3 = element("div");
      svg1 = svg_element("svg");
      use1 = svg_element("use");
      t7 = space();
      h22 = element("h2");
      t8 = text("Handyman");
      t9 = space();
      div4 = element("div");
      svg2 = svg_element("svg");
      use2 = svg_element("use");
      t10 = space();
      h23 = element("h2");
      t11 = text("Stay connected");
      t12 = space();
      div20 = element("div");
      div19 = element("div");
      div9 = element("div");
      div6 = element("div");
      h24 = element("h2");
      t13 = text("Our Stay Plus services are made to made for easy living.");
      t14 = space();
      p = element("p");
      t15 = text("Our Stay Plus services makes your stay extra comfortable and gives you\n          more time to focus on work and leisure. ");
      br = element("br");
      t16 = text("\n          If you simply do not have time\n          or do not want to perform all the daily chores, we can offer a range\n          of services. Gives us a call and speak to our service team and we will\n          tailor a service plan for you.");
      t17 = space();
      div8 = element("div");
      img = element("img");
      t18 = space();
      div7 = element("div");
      t19 = text("Housekeeping is our most popular service.");
      t20 = space();
      div18 = element("div");
      div11 = element("div");
      h25 = element("h2");
      t21 = text("Cleaning & Laundry");
      t22 = space();
      div10 = element("div");
      t23 = text("A clean and tidy home is important, but it can sometimes be difficult\n          to find enough time. We offer cleaning services on daily, weekly or\n          monthly basis. We do not compromise on quality and your safety.\n          Contact us for more information!");
      t24 = space();
      div13 = element("div");
      h26 = element("h2");
      t25 = text("Stay connected");
      t26 = space();
      div12 = element("div");
      t27 = text("We make sure that everything is in place and functioning before moving\n          in, it could be electricity subscriptions, satellite, cable or\n          internet connection via Wi-Fi. Provided that all necessary connections\n          are available in the property.");
      t28 = space();
      div15 = element("div");
      h27 = element("h2");
      t29 = text("Handyman");
      t30 = space();
      div14 = element("div");
      t31 = text("As a tenant of Stay Sthlm you have access to our handyman and our\n          service team five days a week. If you would like help with something\n          specific such as installing a new furniture or help with carrying\n          heavy items, we will happily assist you. Please contact our support\n          team if you need help with something related to your stay here in\n          Stockholm.");
      t32 = space();
      div17 = element("div");
      h28 = element("h2");
      t33 = text("Home delivery of food & catering");
      t34 = space();
      div16 = element("div");
      t35 = text("Are you planning a dinner party? We will happily arrange and help you\n          find the best caterer in Stockholm. We also collaborate with one of\n          Sweden largest online grocery stores, who delivers food to your door\n          step seven days a week. Contact us to find our more.");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1j1213g\"]", document.head);
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
      t1 = claim_text(h20_nodes, "StayPlus");
      h20_nodes.forEach(detach_dev);
      t2 = claim_text(div0_nodes, "\n    Additional services");
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t3 = claim_space(nodes);
      div5 = claim_element(nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      div2 = claim_element(div5_nodes, "DIV", {});
      var div2_nodes = children(div2);
      svg0 = claim_element(div2_nodes, "svg", {
        class: true
      }, 1);
      var svg0_nodes = children(svg0);
      use0 = claim_element(svg0_nodes, "use", {
        "xlink:href": true
      }, 1);
      children(use0).forEach(detach_dev);
      svg0_nodes.forEach(detach_dev);
      t4 = claim_space(div2_nodes);
      h21 = claim_element(div2_nodes, "H2", {});
      var h21_nodes = children(h21);
      t5 = claim_text(h21_nodes, "Cleaning services");
      h21_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t6 = claim_space(div5_nodes);
      div3 = claim_element(div5_nodes, "DIV", {});
      var div3_nodes = children(div3);
      svg1 = claim_element(div3_nodes, "svg", {
        class: true
      }, 1);
      var svg1_nodes = children(svg1);
      use1 = claim_element(svg1_nodes, "use", {
        "xlink:href": true
      }, 1);
      children(use1).forEach(detach_dev);
      svg1_nodes.forEach(detach_dev);
      t7 = claim_space(div3_nodes);
      h22 = claim_element(div3_nodes, "H2", {});
      var h22_nodes = children(h22);
      t8 = claim_text(h22_nodes, "Handyman");
      h22_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      t9 = claim_space(div5_nodes);
      div4 = claim_element(div5_nodes, "DIV", {});
      var div4_nodes = children(div4);
      svg2 = claim_element(div4_nodes, "svg", {
        class: true
      }, 1);
      var svg2_nodes = children(svg2);
      use2 = claim_element(svg2_nodes, "use", {
        "xlink:href": true
      }, 1);
      children(use2).forEach(detach_dev);
      svg2_nodes.forEach(detach_dev);
      t10 = claim_space(div4_nodes);
      h23 = claim_element(div4_nodes, "H2", {});
      var h23_nodes = children(h23);
      t11 = claim_text(h23_nodes, "Stay connected");
      h23_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      t12 = claim_space(nodes);
      div20 = claim_element(nodes, "DIV", {
        class: true
      });
      var div20_nodes = children(div20);
      div19 = claim_element(div20_nodes, "DIV", {
        class: true
      });
      var div19_nodes = children(div19);
      div9 = claim_element(div19_nodes, "DIV", {
        class: true
      });
      var div9_nodes = children(div9);
      div6 = claim_element(div9_nodes, "DIV", {
        class: true
      });
      var div6_nodes = children(div6);
      h24 = claim_element(div6_nodes, "H2", {});
      var h24_nodes = children(h24);
      t13 = claim_text(h24_nodes, "Our Stay Plus services are made to made for easy living.");
      h24_nodes.forEach(detach_dev);
      t14 = claim_space(div6_nodes);
      p = claim_element(div6_nodes, "P", {});
      var p_nodes = children(p);
      t15 = claim_text(p_nodes, "Our Stay Plus services makes your stay extra comfortable and gives you\n          more time to focus on work and leisure. ");
      br = claim_element(p_nodes, "BR", {});
      t16 = claim_text(p_nodes, "\n          If you simply do not have time\n          or do not want to perform all the daily chores, we can offer a range\n          of services. Gives us a call and speak to our service team and we will\n          tailor a service plan for you.");
      p_nodes.forEach(detach_dev);
      div6_nodes.forEach(detach_dev);
      t17 = claim_space(div9_nodes);
      div8 = claim_element(div9_nodes, "DIV", {
        class: true
      });
      var div8_nodes = children(div8);
      img = claim_element(div8_nodes, "IMG", {
        src: true,
        alt: true
      });
      t18 = claim_space(div8_nodes);
      div7 = claim_element(div8_nodes, "DIV", {});
      var div7_nodes = children(div7);
      t19 = claim_text(div7_nodes, "Housekeeping is our most popular service.");
      div7_nodes.forEach(detach_dev);
      div8_nodes.forEach(detach_dev);
      div9_nodes.forEach(detach_dev);
      t20 = claim_space(div19_nodes);
      div18 = claim_element(div19_nodes, "DIV", {
        class: true
      });
      var div18_nodes = children(div18);
      div11 = claim_element(div18_nodes, "DIV", {
        class: true
      });
      var div11_nodes = children(div11);
      h25 = claim_element(div11_nodes, "H2", {});
      var h25_nodes = children(h25);
      t21 = claim_text(h25_nodes, "Cleaning & Laundry");
      h25_nodes.forEach(detach_dev);
      t22 = claim_space(div11_nodes);
      div10 = claim_element(div11_nodes, "DIV", {});
      var div10_nodes = children(div10);
      t23 = claim_text(div10_nodes, "A clean and tidy home is important, but it can sometimes be difficult\n          to find enough time. We offer cleaning services on daily, weekly or\n          monthly basis. We do not compromise on quality and your safety.\n          Contact us for more information!");
      div10_nodes.forEach(detach_dev);
      div11_nodes.forEach(detach_dev);
      t24 = claim_space(div18_nodes);
      div13 = claim_element(div18_nodes, "DIV", {
        class: true
      });
      var div13_nodes = children(div13);
      h26 = claim_element(div13_nodes, "H2", {});
      var h26_nodes = children(h26);
      t25 = claim_text(h26_nodes, "Stay connected");
      h26_nodes.forEach(detach_dev);
      t26 = claim_space(div13_nodes);
      div12 = claim_element(div13_nodes, "DIV", {});
      var div12_nodes = children(div12);
      t27 = claim_text(div12_nodes, "We make sure that everything is in place and functioning before moving\n          in, it could be electricity subscriptions, satellite, cable or\n          internet connection via Wi-Fi. Provided that all necessary connections\n          are available in the property.");
      div12_nodes.forEach(detach_dev);
      div13_nodes.forEach(detach_dev);
      t28 = claim_space(div18_nodes);
      div15 = claim_element(div18_nodes, "DIV", {
        class: true
      });
      var div15_nodes = children(div15);
      h27 = claim_element(div15_nodes, "H2", {});
      var h27_nodes = children(h27);
      t29 = claim_text(h27_nodes, "Handyman");
      h27_nodes.forEach(detach_dev);
      t30 = claim_space(div15_nodes);
      div14 = claim_element(div15_nodes, "DIV", {});
      var div14_nodes = children(div14);
      t31 = claim_text(div14_nodes, "As a tenant of Stay Sthlm you have access to our handyman and our\n          service team five days a week. If you would like help with something\n          specific such as installing a new furniture or help with carrying\n          heavy items, we will happily assist you. Please contact our support\n          team if you need help with something related to your stay here in\n          Stockholm.");
      div14_nodes.forEach(detach_dev);
      div15_nodes.forEach(detach_dev);
      t32 = claim_space(div18_nodes);
      div17 = claim_element(div18_nodes, "DIV", {
        class: true
      });
      var div17_nodes = children(div17);
      h28 = claim_element(div17_nodes, "H2", {});
      var h28_nodes = children(h28);
      t33 = claim_text(h28_nodes, "Home delivery of food & catering");
      h28_nodes.forEach(detach_dev);
      t34 = claim_space(div17_nodes);
      div16 = claim_element(div17_nodes, "DIV", {});
      var div16_nodes = children(div16);
      t35 = claim_text(div16_nodes, "Are you planning a dinner party? We will happily arrange and help you\n          find the best caterer in Stockholm. We also collaborate with one of\n          Sweden largest online grocery stores, who delivers food to your door\n          step seven days a week. Contact us to find our more.");
      div16_nodes.forEach(detach_dev);
      div17_nodes.forEach(detach_dev);
      div18_nodes.forEach(detach_dev);
      div19_nodes.forEach(detach_dev);
      div20_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "StaySthlm - Stay plus";
      add_location(h20, file, 161, 4, 3779);
      attr_dev(div0, "class", "hilight");
      add_location(div0, file, 160, 2, 3753);
      attr_dev(div1, "class", "banner sp-banner");
      add_location(div1, file, 159, 0, 3720);
      xlink_attr(use0, "xlink:href", use0_xlink_href_value = "" + (featherSprite + "#home"));
      add_location(use0, file, 169, 6, 3903);
      attr_dev(svg0, "class", "feather");
      add_location(svg0, file, 168, 4, 3875);
      add_location(h21, file, 171, 4, 3960);
      add_location(div2, file, 167, 2, 3865);
      xlink_attr(use1, "xlink:href", use1_xlink_href_value = "" + (featherSprite + "#plus-circle"));
      add_location(use1, file, 175, 6, 4036);
      attr_dev(svg1, "class", "feather");
      add_location(svg1, file, 174, 4, 4008);
      add_location(h22, file, 177, 4, 4100);
      add_location(div3, file, 173, 2, 3998);
      xlink_attr(use2, "xlink:href", use2_xlink_href_value = "" + (featherSprite + "#mail"));
      add_location(use2, file, 181, 6, 4167);
      attr_dev(svg2, "class", "feather");
      add_location(svg2, file, 180, 4, 4139);
      add_location(h23, file, 183, 4, 4224);
      add_location(div4, file, 179, 2, 4129);
      attr_dev(div5, "class", "sp-feature");
      add_location(div5, file, 166, 0, 3838);
      add_location(h24, file, 191, 8, 4383);
      add_location(br, file, 194, 50, 4592);
      add_location(p, file, 192, 8, 4457);
      attr_dev(div6, "class", "paragraph");
      add_location(div6, file, 190, 6, 4351);
      if (img.src !== (img_src_value = "/client/images/apartment_lila.jpeg")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", "Stay Plus");
      add_location(img, file, 202, 8, 4901);
      add_location(div7, file, 203, 8, 4974);
      attr_dev(div8, "class", "img-box");
      add_location(div8, file, 201, 6, 4871);
      attr_dev(div9, "class", "text-img");
      add_location(div9, file, 189, 4, 4322);
      add_location(h25, file, 209, 8, 5121);
      add_location(div10, file, 210, 8, 5157);
      attr_dev(div11, "class", "paragraph");
      add_location(div11, file, 208, 6, 5089);
      add_location(h26, file, 218, 8, 5504);
      add_location(div12, file, 219, 8, 5536);
      attr_dev(div13, "class", "paragraph");
      add_location(div13, file, 217, 6, 5472);
      add_location(h27, file, 227, 8, 5884);
      add_location(div14, file, 228, 8, 5910);
      attr_dev(div15, "class", "paragraph");
      add_location(div15, file, 226, 6, 5852);
      add_location(h28, file, 238, 8, 6388);
      add_location(div16, file, 239, 8, 6438);
      attr_dev(div17, "class", "paragraph");
      add_location(div17, file, 237, 6, 6356);
      attr_dev(div18, "class", "service-info");
      add_location(div18, file, 207, 4, 5056);
      attr_dev(div19, "class", "content");
      add_location(div19, file, 188, 2, 4296);
      attr_dev(div20, "class", "sp-serviceinfo");
      add_location(div20, file, 187, 0, 4265);
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
      append_dev(div5, div2);
      append_dev(div2, svg0);
      append_dev(svg0, use0);
      append_dev(div2, t4);
      append_dev(div2, h21);
      append_dev(h21, t5);
      append_dev(div5, t6);
      append_dev(div5, div3);
      append_dev(div3, svg1);
      append_dev(svg1, use1);
      append_dev(div3, t7);
      append_dev(div3, h22);
      append_dev(h22, t8);
      append_dev(div5, t9);
      append_dev(div5, div4);
      append_dev(div4, svg2);
      append_dev(svg2, use2);
      append_dev(div4, t10);
      append_dev(div4, h23);
      append_dev(h23, t11);
      insert_dev(target, t12, anchor);
      insert_dev(target, div20, anchor);
      append_dev(div20, div19);
      append_dev(div19, div9);
      append_dev(div9, div6);
      append_dev(div6, h24);
      append_dev(h24, t13);
      append_dev(div6, t14);
      append_dev(div6, p);
      append_dev(p, t15);
      append_dev(p, br);
      append_dev(p, t16);
      append_dev(div9, t17);
      append_dev(div9, div8);
      append_dev(div8, img);
      append_dev(div8, t18);
      append_dev(div8, div7);
      append_dev(div7, t19);
      append_dev(div19, t20);
      append_dev(div19, div18);
      append_dev(div18, div11);
      append_dev(div11, h25);
      append_dev(h25, t21);
      append_dev(div11, t22);
      append_dev(div11, div10);
      append_dev(div10, t23);
      append_dev(div18, t24);
      append_dev(div18, div13);
      append_dev(div13, h26);
      append_dev(h26, t25);
      append_dev(div13, t26);
      append_dev(div13, div12);
      append_dev(div12, t27);
      append_dev(div18, t28);
      append_dev(div18, div15);
      append_dev(div15, h27);
      append_dev(h27, t29);
      append_dev(div15, t30);
      append_dev(div15, div14);
      append_dev(div14, t31);
      append_dev(div18, t32);
      append_dev(div18, div17);
      append_dev(div17, h28);
      append_dev(h28, t33);
      append_dev(div17, t34);
      append_dev(div17, div16);
      append_dev(div16, t35);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div1);
      if (detaching) detach_dev(t3);
      if (detaching) detach_dev(div5);
      if (detaching) detach_dev(t12);
      if (detaching) detach_dev(div20);
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
  validate_slots("Stayplus", slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Stayplus> was created with unknown prop '" + key + "'");
  });

  $$self.$capture_state = () => ({
    featherSprite
  });

  return [];
}

class Stayplus extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Stayplus",
      options,
      id: create_fragment.name
    });
  }

}

export default Stayplus;
