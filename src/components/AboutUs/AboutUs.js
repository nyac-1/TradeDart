import React from 'react';
import {Link,useHistory} from "react-router-dom";
import "./AboutUs.css";

function AboutUs() {


    return (
        <div className = "profile">
            <div className = "navbar">
                <nav className = "navbar__nav">
                    <Link className = "navbar__nav__link" to = "/">
                        <h1><bold>Trade-Dart</bold></h1>
                    </Link>
                </nav>
            </div>
            <div className = "main">
                <div className = "main__left"></div>
                <div className = "main__middle">
                    <div className = "main__middle__title__aboutus">
                        <h1>About Us</h1>
                    </div>
                    <div className = "content">
                        <span className = "body__main">
                        Trading is the practice of observing market trends and taking an apt position to profit from it. It can be backed up by mathematical research, behavioural research, insider information (illegal), etc. Unlike developed markets (NYSE, TSE, LSE, HSE, SGX), it is impossible to trade in the cash market of NSE due to its astringent rules and regulations: short position must be squared off by E.O.D. or the broker will do it at market price, brokers are not allowed to provide extra margin for trading in the cash market. This is the reason why many traders in the Indian markets are attracted to futures and options, which do not have the aforementioned stringent rules. Seeing this, market novices fall prey to fake gurus and online “expert analysts” to take positions without fully understanding its downside. This project is directed towards individuals who would want to enlighten others with their knowledge in trading or would want to expand their horizons. 
                        </span>
                        <span className = "body__main">
                        TradeDart is an web based application built using ReactJS and firebase (NoSQL). The application is primarily segmented to two views: user view and admin view. The users will be able to access blogs that are mandated by the admin, user created forums, view charts and search other users in the organization as well. The admin will be the prime moderator of the community. The admin will be able to post and modify blogs, moderate forums, and search users. The blogs will mostly cover economic and financial news all over the globe, and information about quantitative methods in trading. In the charts section users will be able to check the most traded indices on the NSE: NIFTY and BANKNIFTY. This is the basic functioning of the project.
                        </span>

                        <span id = "sampath">
                            Sampath Routu<br/>
                            Founder of Trade-Dart
                        </span>
                        <span className = "body__main">
                            Contact : routhsampath@gmail.com
                        </span>
                        
                    </div>
                </div>
                <div className = "main__right"></div>

            </div>


            <div className="footer">
                <p> Copyright © Trade-Dart 2021 </p>
            </div>
        </div>
    )
}

export default AboutUs
