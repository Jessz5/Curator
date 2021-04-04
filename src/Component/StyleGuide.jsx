import React from "react";
import ButtonImg from "../assets/button_layout.png";
import DesktopLayout from "../assets/Desktop_layout.png";
import MobileLayout from "../assets/mobile_layout.png";
import ErrorImg from "../assets/Password_Error.png";
import "../App.css";

export default class StyleGuide extends React.Component {
  render() {
    return (
      <div id="Style_Guide_Container">
        <div id="Logo_Section">
          <h2 id="Our_Logo">Using the Logo</h2>
          <p>
            The Curator logo is a simple logo yet it conveyes everything about
            our app in one word.
          </p>
          <h4 id="Title">Logo Guidelines</h4>
          <p>
            When using the Curator logo on a desktop website the logo should
            retain its original size at <span className="Bold">236 X 80</span>{" "}
            the color of the logo will depend on the color of the background of
            your website use the white logo when behind a dark color such as
            balck or navy blue and the black logo for any other color.
          </p>
           <a id="download"href="https://drive.google.com/file/d/1gVgho8PX7_D9Q7QxXLJ76lwU5GYF-CJX/view?usp=sharing">Download Our Logos here</a> 
   
          <div id="Logo_Display">
          <svg width="237" height="80" viewBox="0 0 237 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M185.922 26.8333C175.393 26.8333 166.866 35.4104 166.866 46C166.866 56.5896 175.393 65.1667 185.922 65.1667C196.45 65.1667 204.978 56.5896 204.978 46C204.978 35.4104 196.45 26.8333 185.922 26.8333ZM185.922 54.625C183.648 54.625 181.466 53.7163 179.858 52.0988C178.25 50.4813 177.347 48.2875 177.347 46C177.347 43.7125 178.25 41.5187 179.858 39.9012C181.466 38.2837 183.648 37.375 185.922 37.375C188.196 37.375 190.377 38.2837 191.986 39.9012C193.594 41.5187 194.497 43.7125 194.497 46C194.497 48.2875 193.594 50.4813 191.986 52.0988C190.377 53.7163 188.196 54.625 185.922 54.625ZM185.922 44.0833C184.874 44.0833 184.016 44.9458 184.016 46C184.016 47.0542 184.874 47.9167 185.922 47.9167C186.97 47.9167 187.828 47.0542 187.828 46C187.828 44.9458 186.97 44.0833 185.922 44.0833Z" fill="#1DB954"/>
<path d="M36.16 21.376C37.4827 22.0587 38.144 23.1467 38.144 24.64C38.144 25.536 37.824 26.4107 37.184 27.264C36.5013 28.16 35.6267 28.608 34.56 28.608C33.8347 28.608 33.1093 28.416 32.384 28.032C30.2933 27.0507 28.032 26.56 25.6 26.56C22.6133 26.56 20.0107 27.2 17.792 28.48C15.5733 29.7173 13.8667 31.488 12.672 33.792C11.4773 36.0533 10.88 38.656 10.88 41.6C10.88 46.6347 12.224 50.4533 14.912 53.056C17.6427 55.6587 21.2053 56.96 25.6 56.96C28.2027 56.96 30.464 56.4693 32.384 55.488C33.152 55.1467 33.8347 54.976 34.432 54.976C35.5413 54.976 36.48 55.4453 37.248 56.384C37.888 57.1947 38.208 58.0693 38.208 59.008C38.208 59.6907 38.0373 60.3093 37.696 60.864C37.3547 61.4187 36.864 61.8453 36.224 62.144C32.896 63.808 29.3547 64.64 25.6 64.64C21.4187 64.64 17.5787 63.7653 14.08 62.016C10.5813 60.224 7.78667 57.6 5.696 54.144C3.60533 50.688 2.56 46.5067 2.56 41.6C2.56 37.248 3.54133 33.344 5.504 29.888C7.50933 26.432 10.2613 23.744 13.76 21.824C17.2587 19.8613 21.2053 18.88 25.6 18.88C29.3973 18.88 32.9173 19.712 36.16 21.376ZM68.413 29.76C69.5223 29.76 70.4397 30.144 71.165 30.912C71.8903 31.6373 72.253 32.5547 72.253 33.664V49.92C72.253 54.528 70.973 58.1333 68.413 60.736C65.8957 63.3387 62.2903 64.64 57.597 64.64C52.9037 64.64 49.2983 63.3387 46.781 60.736C44.2637 58.1333 43.005 54.528 43.005 49.92V33.664C43.005 32.5547 43.3677 31.6373 44.093 30.912C44.8183 30.144 45.7357 29.76 46.845 29.76C47.9543 29.76 48.8717 30.144 49.597 30.912C50.3223 31.6373 50.685 32.5547 50.685 33.664V49.92C50.685 52.5227 51.261 54.464 52.413 55.744C53.565 56.9813 55.293 57.6 57.597 57.6C59.9437 57.6 61.693 56.9813 62.845 55.744C63.997 54.464 64.573 52.5227 64.573 49.92V33.664C64.573 32.5547 64.9357 31.6373 65.661 30.912C66.3863 30.144 67.3037 29.76 68.413 29.76ZM97.0795 29.12C98.3595 29.12 99.4262 29.4827 100.28 30.208C101.176 30.9333 101.624 31.7867 101.624 32.768C101.624 34.0907 101.282 35.0933 100.6 35.776C99.9168 36.416 99.1062 36.736 98.1675 36.736C97.5275 36.736 96.8022 36.5867 95.9915 36.288C95.8635 36.2453 95.5648 36.16 95.0955 36.032C94.6688 35.904 94.1995 35.84 93.6875 35.84C92.5782 35.84 91.5115 36.1813 90.4875 36.864C89.4635 37.5467 88.6102 38.592 87.9275 40C87.2875 41.3653 86.9675 43.008 86.9675 44.928V60.096C86.9675 61.2053 86.6048 62.144 85.8795 62.912C85.1542 63.6373 84.2368 64 83.1275 64C82.0182 64 81.1008 63.6373 80.3755 62.912C79.6502 62.144 79.2875 61.2053 79.2875 60.096V33.664C79.2875 32.5547 79.6502 31.6373 80.3755 30.912C81.1008 30.144 82.0182 29.76 83.1275 29.76C84.2368 29.76 85.1542 30.144 85.8795 30.912C86.6048 31.6373 86.9675 32.5547 86.9675 33.664V34.496C87.9488 32.7467 89.3568 31.424 91.1915 30.528C93.0262 29.5893 94.9888 29.12 97.0795 29.12ZM132.72 29.12C133.829 29.12 134.746 29.4827 135.472 30.208C136.197 30.9333 136.56 31.872 136.56 33.024V60.096C136.56 61.2053 136.197 62.144 135.472 62.912C134.746 63.6373 133.829 64 132.72 64C131.61 64 130.693 63.6373 129.968 62.912C129.285 62.1867 128.922 61.2693 128.88 60.16C127.813 61.3973 126.362 62.464 124.528 63.36C122.736 64.2133 120.837 64.64 118.832 64.64C115.888 64.64 113.221 63.8933 110.832 62.4C108.442 60.864 106.544 58.752 105.136 56.064C103.77 53.376 103.088 50.3253 103.088 46.912C103.088 43.4987 103.77 40.448 105.136 37.76C106.501 35.0293 108.357 32.9173 110.704 31.424C113.093 29.888 115.717 29.12 118.576 29.12C120.624 29.12 122.544 29.504 124.336 30.272C126.128 30.9973 127.642 31.936 128.88 33.088V33.024C128.88 31.9147 129.242 30.9973 129.968 30.272C130.693 29.504 131.61 29.12 132.72 29.12ZM119.792 57.6C122.565 57.6 124.826 56.5973 126.576 54.592C128.325 52.544 129.2 49.984 129.2 46.912C129.2 43.84 128.325 41.28 126.576 39.232C124.826 37.184 122.565 36.16 119.792 36.16C117.061 36.16 114.821 37.184 113.072 39.232C111.322 41.28 110.448 43.84 110.448 46.912C110.448 49.984 111.301 52.544 113.008 54.592C114.757 56.5973 117.018 57.6 119.792 57.6ZM160.115 56.768C160.712 56.768 161.245 57.0667 161.715 57.664C162.227 58.2187 162.483 58.9653 162.483 59.904C162.483 61.056 161.843 62.0373 160.563 62.848C159.325 63.616 157.917 64 156.339 64C153.693 64 151.453 63.4453 149.619 62.336C147.827 61.184 146.931 58.7733 146.931 55.104V37.44H143.987C142.963 37.44 142.109 37.0987 141.427 36.416C140.744 35.7333 140.403 34.88 140.403 33.856C140.403 32.8747 140.744 32.064 141.427 31.424C142.109 30.7413 142.963 30.4 143.987 30.4H146.931V26.304C146.931 25.1947 147.293 24.2773 148.019 23.552C148.787 22.784 149.725 22.4 150.835 22.4C151.901 22.4 152.797 22.784 153.523 23.552C154.248 24.2773 154.611 25.1947 154.611 26.304V30.4H159.155C160.179 30.4 161.032 30.7413 161.715 31.424C162.397 32.1067 162.739 32.96 162.739 33.984C162.739 34.9653 162.397 35.7973 161.715 36.48C161.032 37.12 160.179 37.44 159.155 37.44H154.611V54.784C154.611 55.68 154.845 56.3413 155.315 56.768C155.784 57.152 156.424 57.344 157.235 57.344C157.576 57.344 158.045 57.2587 158.643 57.088C159.155 56.8747 159.645 56.768 160.115 56.768Z" fill="black"/>
<path d="M230.742 29.12C232.022 29.12 233.088 29.4827 233.942 30.208C234.838 30.9333 235.286 31.7867 235.286 32.768C235.286 34.0907 234.944 35.0933 234.262 35.776C233.579 36.416 232.768 36.736 231.83 36.736C231.19 36.736 230.464 36.5867 229.654 36.288C229.526 36.2453 229.227 36.16 228.758 36.032C228.331 35.904 227.862 35.84 227.35 35.84C226.24 35.84 225.174 36.1813 224.15 36.864C223.126 37.5467 222.272 38.592 221.59 40C220.95 41.3653 220.63 43.008 220.63 44.928V60.096C220.63 61.2053 220.267 62.144 219.542 62.912C218.816 63.6373 217.899 64 216.79 64C215.68 64 214.763 63.6373 214.038 62.912C213.312 62.144 212.95 61.2053 212.95 60.096V33.664C212.95 32.5547 213.312 31.6373 214.038 30.912C214.763 30.144 215.68 29.76 216.79 29.76C217.899 29.76 218.816 30.144 219.542 30.912C220.267 31.6373 220.63 32.5547 220.63 33.664V34.496C221.611 32.7467 223.019 31.424 224.854 30.528C226.688 29.5893 228.651 29.12 230.742 29.12Z" fill="black"/>
</svg>

          </div>
          <h4 id="Title">Icon Guidelines</h4>
          <p>
            For the curator icon the same rules apply here except for the sizing
            of the logo. The base logo provided is 72x72 pixels however you are
            allowed to chnage the size of the logo if you maintain a 1:1 ratio.
          </p>
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M36.001 6.00003C19.426 6.00003 6.00098 19.425 6.00098 36C6.00098 52.575 19.426 66 36.001 66C52.576 66 66.0009 52.575 66.0009 36C66.0009 19.425 52.576 6.00003 36.001 6.00003ZM36.001 49.5C32.4205 49.5 28.9868 48.0777 26.455 45.546C23.9233 43.0142 22.501 39.5805 22.501 36C22.501 32.4196 23.9233 28.9858 26.455 26.4541C28.9868 23.9223 32.4205 22.5 36.001 22.5C39.5814 22.5 43.0152 23.9223 45.5469 26.4541C48.0786 28.9858 49.501 32.4196 49.501 36C49.501 39.5805 48.0786 43.0142 45.5469 45.546C43.0152 48.0777 39.5814 49.5 36.001 49.5ZM36.001 33C34.351 33 33.001 34.35 33.001 36C33.001 37.65 34.351 39 36.001 39C37.651 39 39.001 37.65 39.001 36C39.001 34.35 37.651 33 36.001 33Z" fill="#1DB954"/>
</svg>

          <h2 id="Title"> Color Pallet </h2>
          <p>
            The Curator page usues 5 main colors throught the whole website our
            logo uses our green,white and or black colors, our login page for
            dektop sues the Oxford blue color and our grey color is used for
            user input forms aswell as highlighting hovered content and the
            background of suer posts.
          </p>
          <div id="color_palette">
            <script src="https://coolors.co/palette-widget/widget.js"></script>
            <script data-id="09572268337735444">
              new CoolorsPaletteWidget("09572268337735444",
              ["1db954","ffffff","191414","c4c4c4","010423"]);{" "}
            </script>
          </div>
          <h2 id="Title">Fonts</h2>
          <p>
            Here at curator we use two fonts:
            <ul>
              <li className ="fonts">Quicksand</li>
              <li className = "fonts">EB Garamond</li>
            </ul>
            If you are unable to use these fonts we recommened using your local
            sans-serif font
          </p>
          <h2 id="Title">Design Layout and Components</h2>
          <h4>Buttons and User Inputs</h4>
          <p>
            Buttons and User forms on Curator should maitain the same dimmesions
            as specified to maintain maximum clarity throughout the platform.
          </p>
          <h4>Example</h4>
          <p>
            Curator buttons uses one of 2 button styles when implmented in user
            forms each input are be 32px apart on mobile and 48px apart on
            desktop. If you wish to change these spacing guidlines you can under
            the condition that you maintiain a spacing that is a multiple of 8.
          </p>
          <img
            src={ButtonImg}
            className="button_img"
            alt="Example"
            title="Button Examples"
          />
          <h2 id="Title">Basic Layout</h2>
          <h4>Desktop</h4>
          <p>
            When exdeing this app it is important to keep some type of grid
            layout.The grid layouts should be either rows of 3 or 2 respectivly
            with spacing being at least 32px apart anything bigger also has to
            be in a multiple of 8 aswell.
          </p>
          <img
            src={DesktopLayout}
            className="desktop_img"
            alt="DL"
            title="Desktop Examples"
          />
          <h4>Mobile</h4>
          <p>
            For mobile instead of haveing rows we recommend using a single
            column. However the spacing guidelines from the desktop
          </p>
          <img
            src={MobileLayout}
            className="mobile_img"
            alt="DL"
            title="Desktop Examples"
          />
          <h2 id="Title">Error Handling</h2>
          <p>
            When handling erors its important to make sure the error message is
            displyed under the area of note. The color should always be red and
            the font should be Quicksand Bolded and underlined.
          </p>
          <img
            src={ErrorImg}
            className="error_img"
            alt="error"
            title="Error Examples"
          />
        </div>
      </div>
    );
  }
}
