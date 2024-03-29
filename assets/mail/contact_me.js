/***
$(function () {
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            $.ajax({
                url: "/Prod/submitForm",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message,
                },
                crossDomain: true,
                contentType: 'application/json',
                cache: false,
                success: function () {
                    // Success message
                    $("#success").html("<div class='alert alert-success'>");
                    $("#success > .alert-success")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-success").append(
                        "<strong>Your message has been sent. </strong>"
                    );
                    $("#success > .alert-success").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                error: function () {
                    // Fail message
                    $("#success").html("<div class='alert alert-danger'>");
                    $("#success > .alert-danger")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-danger").append(
                        $("<strong>").text(
                            "Sorry " +
                                firstName +
                                ", it seems that my mail server is not responding. Please try again later!"
                        )
                    );
                    $("#success > .alert-danger").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                    }, 1000);
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});
***/

$(function () {
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour

            const form = document.querySelector('form');
            const submitResponse = document.querySelector('#success');
            const formURL = 'https://www.smart-infra.net/Prod/submitForm';

            let data = {};
            Array.from(form).map(input => (data[input.id] = input.value));
            data["date"]=window.Date()
            console.log('Sending: ', JSON.stringify(data));
            //submitResponse.innerHTML = 'Sending...'
            $("#success").html("<div class='alert alert-warning'>");
            $("#success > .alert-warning")
                .html(
                    "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                )
                .append("</button>");
            $("#success > .alert-warning").append(
                "<strong>Your message is been sending... </strong>"
            );
            $("#success > .alert-warning").append("</div>");
            //clear all fields
            $("#contactForm").trigger("reset");
      
            // Create the AJAX request
            var xhr = new XMLHttpRequest();
            xhr.open('POST', formURL, true);
            xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      
            // Send the collected data as JSON
            xhr.send(JSON.stringify(data));
      
            xhr.onloadend = response => {
              $("#success").show()
              if (response.target.status === 200) {
                  // Success message
                  $("#success").html("<div class='alert alert-success'>");
                  $("#success > .alert-success")
                      .html(
                          "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                      )
                      .append("</button>");
                  $("#success > .alert-success").append(
                      "<strong>Your message has been sent. </strong>"
                  );
                  $("#success > .alert-success").append("</div>");
                  //clear all fields
                  $("#contactForm").trigger("reset");
              } else {
                  // Fail message
                  $("#success").html("<div class='alert alert-danger'>");
                  $("#success > .alert-danger")
                      .html(
                          "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                      )
                      .append("</button>");
                  $("#success > .alert-danger").append(
                      $("<strong>").text(
                          "Sorry " + $("input#name").val() +
                              ", it seems that my mail server is not responding. Please try again later!"
                      )
                  );
                  $("#success > .alert-danger").append("</div>");
                  //clear all fields
                  $("#contactForm").trigger("reset");
              }
              setTimeout(() => $("#success").hide() , 7000);  
            }; 
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});
/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});

/***** 
(() => {
    const form = document.querySelector('form');
    const submitResponse = document.querySelector('#success');
    const formURL = 'https://www.smart-infra.net/Prod/submitForm';

    form.onsubmit = e => {
      e.preventDefault();

      // Capture the form data
      let data = {};
      Array.from(form).map(input => (data[input.id] = input.value));
      console.log('Sending: ', JSON.stringify(data));
      submitResponse.innerHTML = 'Sending...'

      // Create the AJAX request
      var xhr = new XMLHttpRequest();
      xhr.open('POST', formURL, true);
      xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

      // Send the collected data as JSON
      xhr.send(JSON.stringify(data));

      xhr.onloadend = response => {
        if (response.target.status === 200) {
            // Success message
            $("#success").html("<div class='alert alert-success'>");
            $("#success > .alert-success")
                .html(
                    "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                )
                .append("</button>");
            $("#success > .alert-success").append(
                "<strong>Your message has been sent. </strong>"
            );
            $("#success > .alert-success").append("</div>");
            //clear all fields
            $("#contactForm").trigger("reset");
        } else {
            // Fail message
            $("#success").html("<div class='alert alert-danger'>");
            $("#success > .alert-danger")
                .html(
                    "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                )
                .append("</button>");
            $("#success > .alert-danger").append(
                $("<strong>").text(
                    "Sorry " + $("input#name").val() +
                        ", it seems that my mail server is not responding. Please try again later!"
                )
            );
            $("#success > .alert-danger").append("</div>");
            //clear all fields
            $("#contactForm").trigger("reset");
        }
      };    
    };
  })();

  */