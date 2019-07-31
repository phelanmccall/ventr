import React from "react";

const Navbar = () => {


    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">

                <a className="navbar-brand" href="/">
                    <img src="/ventrLogo.jpg" width="30" height="30"
                        className="align-top" alt="~\\~"
                        style={{ borderRadius: 7 }} />Ventr</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarColor01">
                   <form className="ml-auto mr-0" action="/login" method="post">
                    <input type="email" name="email" id="inputEmail" className="btn btn-light border  mr-sm-2" placeholder="Email address" required="" autofocus="" />
                    <input type="password" name="password" id="inputPassword" className="btn btn-light border  mr-sm-2" placeholder="Password" required="" autofocus="" />
                    <button type="submit" className="btn btn-primary my-2 my-sm-0">Submit</button>
                    </form>
                </div>

            </nav>
        </div>
    );
}

export default Navbar;