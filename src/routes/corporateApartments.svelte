<script>
    import featherSprite from "../assets/images/icons/feather-sprite.svg";
    let totalNr = 0;

    if (typeof window !== "undefined") {
        let timer = 1;
        for (let i = 0; i <= 22349; i += 10) {
            timer += 2;
            window.setTimeout(function () {
				totalNr = numberWithCommas(i);
            }, timer);
        }

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
</script>

<style lang="scss" src="../style/ca.scss" global>
</style>

<svelte:head>
    <title>StaySthlm - Corporate Apartments</title>
</svelte:head>

<div class="banner ca-banner">
    <div class="hilight">
        <h2>Corporate apartments</h2>
        Corporate housing made easy!
    </div>
</div>

<div class="ca-information">
    <div class="content">
        <div class="nr-box">
            <h2>{totalNr}</h2>
            <p>square meters of apartment space</p>
        </div>
        <div class="info">
            <div>
                <h2>A good living is a prerequisite for a good career</h2>
                <p>
                    Our role is to provide comfortable living and make sure your stay in Stockholm will be as smooth as possible. With Stay Sthlm as your partner, both you who work in Stockholm and the company’s HR-department, you will have full
                    access to all our services and our team. Our team is available for all types of question, such as restaurant bookings, questions about interior design, housekeeping, etc.
                </p>
                <p>“We strive for easy living, to avoid unnecessary everyday chores and make your stay focused on doing a good job and enjoying your stay in your new country.” – Daniel S. CEO of Stay Sthlm</p>
            </div>
            <div class="art-2">
                <h2>Customized apartments that suit your specific needs!</h2>
                <p>
                    To arrange the accommodation that best suits you, you can choose apartments with different locations and interior standard. The accommodation can also include a variety of different types of services, for example cleaning,
                    laundry, handyman etc. As a tenant, you have access to information such as on transport, parking, shops and other things you may need to know for a comfortable stay.
                </p>
            </div>
        </div>
    </div>
</div>

<div class="ca-feature">
    <div class="container">
        <div>
            <svg class="feather">
                <use xlink:href="{featherSprite}#dollar-sign" />
            </svg>
            <h2>Affordable</h2>
            <p>We work efficiently and are therefore able to keep our prices down – without compromising safety and quality.</p>
        </div>
        <div>
            <svg class="feather">
                <use xlink:href="{featherSprite}#key" />
            </svg>
            <h2>Larger & comfortable spaces</h2>
            <p>Our apartments are often two or three times larger than a hotel room. It is your home away from home.</p>
        </div>
        <div>
            <svg class="feather">
                <use xlink:href="{featherSprite}#github" />
            </svg>
            <h2>Optimal planning</h2>
            <p>Our apartments have optimal planning to cater to your specific demands. It could be a studio downtown apartment or a large family apartment close to all the amenities.</p>
        </div>
        <div>
            <svg class="feather">
                <use xlink:href="{featherSprite}#coffee" />
            </svg>
            <h2>Kitchen to thrive in</h2>
            <p>With a fully equipped kitchen it is easy to feel comfortable, wether it is for relaxing and enjoying a homemade meal or for hosting a dinner party with friends.</p>
        </div>
        <div>
            <svg class="feather">
                <use xlink:href="{featherSprite}#heart" />
            </svg>
            <h2>Personal freedom</h2>
            <p>Many of our apartments are equipped with washing machine and dryer, which gives you full flexibility. We also offer cleaning service if you prefer that. All tenants have access to the properties laundry room.</p>
        </div>
        <div>
            <svg class="feather">
                <use xlink:href="{featherSprite}#message-circle" />
            </svg>
            <h2>Relations & customer service</h2>
            <p>We know that it feels safer when there is someone who responds. Our Stay Sthlm team is available for you 24-7.</p>
        </div>
    </div>
</div>
