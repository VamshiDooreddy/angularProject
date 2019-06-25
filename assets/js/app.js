//****************** Create Module *************
var myApp = angular.module("myApp",['ngRoute']);

//****************** Remove ! and * From URL *********
myApp.config(['$locationProvider',function($locationProvider) {
	 $locationProvider .html5Mode(true);
}]);

//****************** Route Configuration  ************
myApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.caseInsensitiveMatch = true;
	$routeProvider
	.when("/",{
		templateUrl:"views/index.html",
		controller:"welcomeCtrl"
	})
	.when("/index",{
		templateUrl:"views/index.html",
		controller:"welcomeCtrl"
	})
	.when("/about",{
		templateUrl:"views/about.html",
		controller:"welcomeCtrl"
	})
	.when("/services",{
		templateUrl:"views/services.html",
		controller:"welcomeCtrl"
	})
	.when("/contact",{
		templateUrl:"views/contact.html",
		controller:"welcomeCtrl"
	})
	.when("/login",{
		templateUrl:"views/login.html",
		controller:"onBoardingCtrl"
	})
	.when("/signup",{
		templateUrl:"views/signup.html",
		controller:"onBoardingCtrl"
	})
	.when("/forgot",{
		templateUrl:"views/forgot.html",
		controller:"onBoardingCtrl"
	})
	.when("/dashboard",{
		templateUrl:"views/dashboard.html",
		controller:"dashboardCtrl"
	})
}]);

//************* Create Data Factory For API Calls *******
myApp.factory('dataFactory',['$http',function($http){
	var dataFactory = {};
	dataFactory.request = function(api,params,method){
		return $http({
			url:api,
			params:params,
			method:method
		});
	};
	return dataFactory;
}]);

//********** Cretae Flash Factory *********
myApp.factory('flashFactory',['$timeout',function($timeout){
	var flashFactory = {};
	flashFactory.request = function($scope,variable){
		 $timeout(function () {
		 	delete $scope[variable];
		  }, 5000);
	}
	return flashFactory;
}]);

/********* Password hashing factory *******/
myApp.factory('passwordHash',function(){
	var passwordHash = {};
	passwordHash.request = function(s){
		//SHA256 Algorithm
        var chrsz = 8;
        var hexcase = 0;

        function safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }

        function S(X, n) {
            return (X >>> n) | (X << (32 - n));
        }

        function R(X, n) {
            return (X >>> n);
        }

        function Ch(x, y, z) {
            return ((x & y) ^ ((~x) & z));
        }

        function Maj(x, y, z) {
            return ((x & y) ^ (x & z) ^ (y & z));
        }

        function Sigma0256(x) {
            return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
        }

        function Sigma1256(x) {
            return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
        }

        function Gamma0256(x) {
            return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
        }

        function Gamma1256(x) {
            return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
        }

        function core_sha256(m, l) {
            var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
            var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
            var W = new Array(64);
            var a, b, c, d, e, f, g, h, i, j;
            var T1, T2;
            m[l >> 5] |= 0x80 << (24 - l % 32);
            m[((l + 64 >> 9) << 4) + 15] = l;
            for (var i = 0; i < m.length; i += 16) {
                a = HASH[0];
                b = HASH[1];
                c = HASH[2];
                d = HASH[3];
                e = HASH[4];
                f = HASH[5];
                g = HASH[6];
                h = HASH[7];
                for (var j = 0; j < 64; j++) {
                    if (j < 16) W[j] = m[j + i];
                    else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
                    T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                    T2 = safe_add(Sigma0256(a), Maj(a, b, c));
                    h = g;
                    g = f;
                    f = e;
                    e = safe_add(d, T1);
                    d = c;
                    c = b;
                    b = a;
                    a = safe_add(T1, T2);
                }
                HASH[0] = safe_add(a, HASH[0]);
                HASH[1] = safe_add(b, HASH[1]);
                HASH[2] = safe_add(c, HASH[2]);
                HASH[3] = safe_add(d, HASH[3]);
                HASH[4] = safe_add(e, HASH[4]);
                HASH[5] = safe_add(f, HASH[5]);
                HASH[6] = safe_add(g, HASH[6]);
                HASH[7] = safe_add(h, HASH[7]);
            }
            return HASH;
        }

        function str2binb(str) {
            var bin = Array();
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < str.length * chrsz; i += chrsz) {
                bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
            }
            return bin;
        }

        function Utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }

        function binb2hex(binarray) {
            var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                    hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
            }
            return str;
        }
        s = Utf8Encode(s);
        return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
	}
	return passwordHash;
})

//*********** Number Mask Directive *********
myApp.directive('numberMask', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
        	element.bind("keypress",function(event){
        		if(isNaN(event.key)){
        			event.preventDefault();
        			return false;
        		}
        	})
        }
    }
});

//*********** Character Mask Directive ********
myApp.directive('characterMask',function(){
	return {
		restrict :'A',
		link:function(scope,element,attrs){
			element.bind("keypress",function(event){
				if(!isNaN(event.key)){
					event.preventDefault();
					return false;
				}
			})
		}
	}
})


//****************** Welcome Controller ************
myApp.controller('welcomeCtrl', ['$scope','$location', function($scope,$location){
	
}])


//***************** Navbar Controller *************
myApp.controller('navbarCtrl',['$scope','$location',function($scope,$location){
	$scope.isActive = function(destination){
		return destination === $location.path();
	}				
}]);


//**************** OnBoarding Controller ***********
myApp.controller('onBoardingCtrl',['$scope','$rootScope','$location','dataFactory','flashFactory','passwordHash','$timeout',function($scope,$rootScope,$location,dataFactory,flashFactory,passwordHash,$timeout){
	// Login Form Validation
	$scope.loginSubmit = function(isValid){
		if(isValid){
			$rootScope.loginStatus = false;
			$scope.loginEmail = loginForm.email.value;
			$scope.loginPassword = loginForm.password.value;
			$scope.loginPassword = passwordHash($scope.loginPassword);
			var API = "http://localhost/angular/api/getUsersData.php";
			dataFactory.request(API,{},"POST")
			.then(function(response){
				response = response.data;
				if(response.status==true){
					var emailStatus = false;
					var passwordStatus = false;
					var userObj = null;
					angular.forEach(response.data, function(value, key) {
					    if(value.email==$scope.loginEmail){
					    	emailStatus = true;
					    	if(value.password==$scope.loginPassword){
					    		passwordStatus = true;
					    		userObj = value;
					    	}
					    }
					});
					if(emailStatus==true){
						if(passwordStatus==true){
							if(userObj.activationStatus=="active"){
								$scope.loginMessage = "Login success.";
								$scope.loginMessageType=true;
								$rootScope.loginStatus = true;
								$timeout(function(){
									$location.path("/dashboard");
								},2000);
							}else{
								$scope.loginMessage = "Your account is not activated.";
								$scope.loginMessageType=false;
							}
						}else{
							$scope.loginMessage = "Invalid password.";
							$scope.loginMessageType=false;
						}
					}else{
						$scope.loginMessage = "Email address not found.";
						$scope.loginMessageType=false;
					}
				}else{
					$scope.loginMessage = response.message;
					$scope.loginMessageType=false;
				}
				flashFactory.request($scope,'loginMessage');
			},function(response){
				$scope.loginMessage = "Unable to connect, status : "+response.status;
				$scope.loginMessageType=false;
				flashFactory.request($scope,'loginMessage');
			})
		}
	}
	//Signup Form Validation
	$scope.signupSubmit = function(isValid){
		if(isValid){
			$scope.signupEmail = signupForm.email.value;
			$scope.signupName = signupForm.name.value;
			$scope.signupPhone = signupForm.phone.value;
			$scope.signupPassword = signupForm.password.value;
			$scope.signupPassword = passwordHash.request($scope.signupPassword);
			var API = "http://localhost/angular/api/userRegistration.php"; 
			var params = {
				email:$scope.signupEmail,
				name:$scope.signupName,
				phone:$scope.signupPhone,
				password:$scope.signupPassword
			};
			dataFactory.request(API,params,"POST")
			.then(function(response){
				response = response.data;
				if(response.status==true){
					$scope.signupMessage = response.message;
					$scope.signupMessageType=true;
					$timeout(function(){
						$location.path("/login");
					},2000);
				}else{
					$scope.signupMessage = response.message;
					$scope.signupMessageType=false;
				}
				flashFactory.request($scope,'signupMessage');
			},
			function(response){
				$scope.signupMessage = "Unable to connect, status : "+response.status;
				$scope.signupMessageType=false;
				flashFactory.request($scope,'signupMessage');
			});
		}
	}
}]);

//**************** Dashboard Controller ************
myApp.controller('dashboardCtrl',['$scope','$rootScope','dataFactory','flashFactory','$timeout','$location',function($scope,$rootScope,dataFactory,flashFactory,$timeout,$location){
	//validate if the user is logged in or not
	if($rootScope.loginStatus!==true){
		$location.path("/login");
	}
}]);


