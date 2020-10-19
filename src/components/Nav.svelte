<script>
  export let segment;
  import featherSprite from "../assets/images/icons/feather-sprite.svg";

  const onNavHideMobileMenu = () => {
    const body = document.querySelector("body");
    const menuList = document.querySelector(".menu-list");

    body.classList.remove("disabled");
    menuList.classList.remove("show");
  };

  const onNavShowMobileMenu = () => {
    const body = document.querySelector("body");
    const menuList = document.querySelector(".menu-list");

    body.classList.remove("disabled");
    menuList.classList.add("show");
  };
</script>

<style lang="scss" src="../style/nav.scss" global>
</style>

<nav class="navbar">
  <div class="content">
    <div class="logo">
      <a href="/"><img alt="StaySthlm" src="/client/images/StaySthlm-Top-Logo.png" /></a>
    </div>
    <ul class="menu-list">
      <div class="icon cancel-btn" on:click={onNavHideMobileMenu}>
        <svg class="feather">
          <use xlink:href="{featherSprite}#x" />
        </svg>
      </div>
      <li>
        <a
          aria-current={segment === undefined ? 'page' : undefined}
          href="." on:click={onNavHideMobileMenu}>Home</a>
      </li>
      <li>
        <a
          aria-current={segment === 'corporateApartments' ? 'page' : undefined}
          href="corporateApartments" on:click={onNavHideMobileMenu}>Corporate apartments</a>
      </li>
      <li>
        <a
          aria-current={segment === 'stayplus' ? 'page' : undefined}
          href="stayplus" on:click={onNavHideMobileMenu}>Stay plus</a>
      </li>
      <li>
        <a
          aria-current={segment === 'contact' ? 'page' : undefined}
          href="contact" on:click={onNavHideMobileMenu}>Contact</a>
      </li>
    </ul>
    <div class="icon menu-btn" on:click={onNavShowMobileMenu}>
      <svg class="feather">
        <use xlink:href="{featherSprite}#align-left" />
      </svg>
    </div>
  </div>
</nav>
