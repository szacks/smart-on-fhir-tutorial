(function(window){
  window.extractData = function() {
    var ret = $.Deferred();

    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }

    function onReady(smart)  {
      if (smart.hasOwnProperty('patient')) {
        var patient = smart.patient;
        var pt = patient.read();
        
        $.when(pt).fail(onError);

        $.when(pt).done(function(patient) {
          var fname = '';
          var lname = '';

          if (typeof patient.name[0] !== 'undefined') {
            fname = patient.name[0].given[0].join(' ');
            //lname = patient.name[0].family.join(' ');
            //fname = "test first name";
            lname = "test";
          }

          var p = defaultPatient();
          p.fname = fname;
          p.lname = lname;
          ret.resolve(p);
        });
      } else {
        onError();
      }
    }

    FHIR.oauth2.ready(onReady, onError);
    return ret.promise(); 

  };

  function defaultPatient(){
    return {
      fname: {value: ''},
      lname: {value: ''},
    };
  }

  window.drawVisualization = function(p) {
    $('#holder').show();
    $('#loading').hide();
    $('#fname').html(p.fname);
    $('#lname').html(p.lname);
  };

})(window);
