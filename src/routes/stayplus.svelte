<script>
  import featherSprite from "../assets/images/icons/feather-sprite.svg";
</script>

<style lang="scss" src="../style/stayplus.scss" global>
</style>

<svelte:head>
  <title>StaySthlm - Stay plus</title>
</svelte:head>

<div class="banner sp-banner">
  <div class="hilight">
    <h2>StayPlus</h2>
    Additional services
  </div>
</div>

<div class="sp-feature">
  <div>
    <svg class="feather">
      <use xlink:href="{featherSprite}#home" />
    </svg>
    <h2>Cleaning services</h2>
  </div>
  <div>
    <svg class="feather">
      <use xlink:href="{featherSprite}#plus-circle" />
    </svg>
    <h2>Handyman</h2>
  </div>
  <div>
    <svg class="feather">
      <use xlink:href="{featherSprite}#mail" />
    </svg>
    <h2>Stay connected</h2>
  </div>
</div>

<div class="sp-serviceinfo">
  <div class="content">
    <div class="text-img">
      <div class="paragraph">
        <h2>Our Stay Plus services are made to made for easy living.</h2>
        <p>
          Our Stay Plus services makes your stay extra comfortable and gives you
          more time to focus on work and leisure. <br>
          If you simply do not have time
          or do not want to perform all the daily chores, we can offer a range
          of services. Gives us a call and speak to our service team and we will
          tailor a service plan for you.
        </p>
      </div>
      <div class="img-box">
        <img src="/client/images/apartment_lila.jpeg" alt="Stay Plus" />
        <div>Housekeeping is our most popular service.</div>
      </div>
    </div>

    <div class="service-info">
      <div class="paragraph">
        <h2>Cleaning & Laundry</h2>
        <div>
          A clean and tidy home is important, but it can sometimes be difficult
          to find enough time. We offer cleaning services on daily, weekly or
          monthly basis. We do not compromise on quality and your safety.
          Contact us for more information!
        </div>
      </div>
      <div class="paragraph">
        <h2>Stay connected</h2>
        <div>
          We make sure that everything is in place and functioning before moving
          in, it could be electricity subscriptions, satellite, cable or
          internet connection via Wi-Fi. Provided that all necessary connections
          are available in the property.
        </div>
      </div>
      <div class="paragraph">
        <h2>Handyman</h2>
        <div>
          As a tenant of Stay Sthlm you have access to our handyman and our
          service team five days a week. If you would like help with something
          specific such as installing a new furniture or help with carrying
          heavy items, we will happily assist you. Please contact our support
          team if you need help with something related to your stay here in
          Stockholm.
        </div>
      </div>
      <div class="paragraph">
        <h2>Home delivery of food & catering</h2>
        <div>
          Are you planning a dinner party? We will happily arrange and help you
          find the best caterer in Stockholm. We also collaborate with one of
          Sweden largest online grocery stores, who delivers food to your door
          step seven days a week. Contact us to find our more.
        </div>
      </div>
    </div>
  </div>
</div>