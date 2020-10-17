<script>
    import featherSprite from "../assets/images/icons/feather-sprite.svg";
</script>

<style lang="scss" src="../style/index.scss" global></style>

<svelte:head>
    <title>StaySthlm.com</title>
</svelte:head>

<div class="banner"></div>

<div class="feature">
    <a href="corporateApartments">
        <svg class="feather">
            <use xlink:href="{featherSprite}#home" />
        </svg>
        <h2>Corporate Apartments</h2>
    </a>
    <a href="stayplus">
        <svg class="feather">
            <use xlink:href="{featherSprite}#plus-circle" />
        </svg>
        <h2>StayPlus</h2>
    </a>
    <a href="contact">
        <svg class="feather">
            <use xlink:href="{featherSprite}#mail" />
        </svg>
        <h2>Contact us</h2>
    </a>
</div>

<div class="information">
    <div class="container">
        <div>
            <h2>Stay Stockholm offers tailored housing solutions for those working a limited time in Stockholm. <br /> A home away from home.</h2>
            <p>
                Our mission is to provide good, safe and comfortable corporate housing in the Stockholm region. We provide temporary, furnished and unfurnished apartments for as long or short as you need them. This makes your working life in
                Stockholm more convenient and you do not have to worry about expensive hotel bills, time-consuming commuting and other forms of difficult housing solutions.
            </p>
            <q> Corporate housing made easy! </q>
            <p>
                Staying in hotels is usually at least twice as expensive per month than renting an apartment from Stay Sthlm. With our housing solution you will easily find yourself comfortably in the center of Stockholm or the outskirts, in a secure
                accommodation with the standard you require. We will be your partner for everything that comes with an easy and stress-free accommodation in Stockholm.
            </p>
        </div>
        <div>
            <h2>Your success is our success. <br /> Stay Sthlm is the fastest growing player in the corporate apartment sector in Stockholm, Sweden!</h2>
            <p>
                We are totally focused on being able to offer attractive apartments in the Stockholm region. Our apartments range from small studio apartments to larger family apartments in Stockholm’s top locations. Our furnished apartments are
                decorated in a functional modern Scandinavian décor with all the amenities you need for comfortable living. We also offer non-furnished apartments. We value your time, and therefore offer a service to all our tenants called Stay Plus.
                If you want to stay focused on your job or maybe spend more time exploring Stockholm, our tailored Stay Plus services is the perfect the choice for you. We offer personalized service 24-7, please do not hesitate to contact us to learn
                more about our service portfolio.
            </p>
        </div>
    </div>
</div>