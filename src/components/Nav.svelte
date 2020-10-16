<script>
  export let segment;
  import companyLogo from "../../static/logo.jpg";
</script>

<!-- <style lang="scss" global>
  @import "../style/nav.scss";
</style> -->

<nav>
  <ul>
    <li><img class="logo" alt="StaySthlm" src={companyLogo} /></li>
    <li>
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        href=".">home</a>
    </li>
    <li>
      <a
        aria-current={segment === 'corporateApartments' ? 'page' : undefined}
        href="corporateApartments">Corporate apartments</a>
    </li>
    <li>
      <a
        aria-current={segment === 'stayplus' ? 'page' : undefined}
        href="stayplus">Stay plus</a>
    </li>
    <li>
      <a
        aria-current={segment === 'ourteam' ? 'page' : undefined}
        href="ourteam">Our team</a>
    </li>
    <li>
      <a
        aria-current={segment === 'contact' ? 'page' : undefined}
        href="contact">Contact</a>
    </li>
  </ul>
</nav>
