$(document).ready(() => {
  setPlatformDetails()
  setNavigatorDetails()
})

const getPlatformDetails = () => {
  return {
    browser: platform.name,
    os: platform.os.toString(),
    description: platform.toString(),
    product: platform.product
  }
}

const setPlatformDetails = () => {
  const {
    browser: platformBrowser,
    os: platformOs,
    description: platformDescription,
    product: platformProduct
  } = getPlatformDetails()

  $('.platform__browser').text(platformBrowser)
  $('.platform__os').text(platformOs)
  $('.platform__description').text(platformDescription)
  $('.platform__product').text(platformProduct)
}

const setNavigatorDetails = () => {
  const { ua, Browser, OsName, OsVersion, Mobile, Device } =
    getBrowserMetaData()

  $('.navigator__browser').text(Browser)
  $('.navigator__os').text(OsName)
  $('.navigator__osv').text(OsVersion)
  $('.navigator__mobile').text(Mobile)
  $('.navigator__device').text(Device)
  $('.navigator__platform').text(ua)
  $('.navigator__ua').text(ua)
}

const getBrowserMetaData = () => {
  var unknown = '-'

  // screen
  var width,
    height,
    screenSize = 0
  var screenSize = ''
  if (screen.width) {
    width = screen.width ? screen.width : ''
    height = screen.height ? screen.height : ''
    screenSize += '' + width + ' x ' + height
  }

  // browser
  var nVer = navigator.appVersion
  var nAgt = navigator.userAgent
  var browser = navigator.appName
  var version = '' + parseFloat(navigator.appVersion)
  var majorVersion = parseInt(navigator.appVersion, 10)
  var nameOffset, verOffset, ix
  var flashVersion = ''
  // Opera
  if ((verOffset = nAgt.indexOf('Opera')) != -1) {
    browser = 'Opera'
    version = nAgt.substring(verOffset + 6)
    if ((verOffset = nAgt.indexOf('Version')) != -1) {
      version = nAgt.substring(verOffset + 8)
    }
  }
  // Opera Next
  if ((verOffset = nAgt.indexOf('OPR')) != -1) {
    browser = 'Opera'
    version = nAgt.substring(verOffset + 4)
  }
  // Edge
  else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
    browser = 'Microsoft Edge'
    version = nAgt.substring(verOffset + 5)
  }
  // MSIE
  else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
    browser = 'Microsoft Internet Explorer'
    version = nAgt.substring(verOffset + 5)
  }
  // Chrome
  else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
    browser = 'Chrome'
    version = nAgt.substring(verOffset + 7)
  }
  // Safari
  else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
    browser = 'Safari'
    version = nAgt.substring(verOffset + 7)
    if ((verOffset = nAgt.indexOf('Version')) != -1) {
      version = nAgt.substring(verOffset + 8)
    }
  }
  // Firefox
  else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
    browser = 'Firefox'
    version = nAgt.substring(verOffset + 8)
  }
  // MSIE 11+
  else if (nAgt.indexOf('Trident/') != -1) {
    browser = 'Microsoft Internet Explorer'
    version = nAgt.substring(nAgt.indexOf('rv:') + 3)
  }
  // Other browsers
  else if (
    (nameOffset = nAgt.lastIndexOf(' ') + 1) <
    (verOffset = nAgt.lastIndexOf('/'))
  ) {
    browser = nAgt.substring(nameOffset, verOffset)
    version = nAgt.substring(verOffset + 1)
    if (browser.toLowerCase() == browser.toUpperCase()) {
      browser = navigator.appName
    }
  }
  // trim the version string
  if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix)
  if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix)
  if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix)

  majorVersion = parseInt('' + version, 10)
  if (isNaN(majorVersion)) {
    version = '' + parseFloat(navigator.appVersion)
    majorVersion = parseInt(navigator.appVersion, 10)
  }

  // mobile version
  var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer)

  // cookie
  var cookieEnabled = navigator.cookieEnabled ? true : false

  if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
    document.cookie = 'testcookie'
    cookieEnabled = document.cookie.indexOf('testcookie') != -1 ? true : false
  }

  // system
  var os = unknown
  var clientStrings = [
    { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
    { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
    { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
    { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
    { s: 'Windows Vista', r: /Windows NT 6.0/ },
    { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
    { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
    { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
    { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
    { s: 'Windows 98', r: /(Windows 98|Win98)/ },
    { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
    { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
    { s: 'Windows CE', r: /Windows CE/ },
    { s: 'Windows 3.11', r: /Win16/ },
    { s: 'Android', r: /Android/ },
    { s: 'Open BSD', r: /OpenBSD/ },
    { s: 'Sun OS', r: /SunOS/ },
    { s: 'Linux', r: /(Linux|X11)/ },
    { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
    { s: 'Mac OS X', r: /Mac OS X/ },
    { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
    { s: 'QNX', r: /QNX/ },
    { s: 'UNIX', r: /UNIX/ },
    { s: 'BeOS', r: /BeOS/ },
    { s: 'OS/2', r: /OS\/2/ },
    {
      s: 'Search Bot',
      r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
    },
  ]
  for (var id in clientStrings) {
    var cs = clientStrings[id]
    if (cs.r.test(nAgt)) {
      os = cs.s
      break
    }
  }

  var osVersion = unknown

  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)[1]
    os = 'Windows'
  }

  switch (os) {
    case 'Mac OS X':
      osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1]
      break

    case 'Android':
      osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1]
      break

    case 'iOS':
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer)
      osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0)
      break
  }

  flashVersion = 'no check'
  if (typeof swfobject != 'undefined') {
    var fv = swfobject.getFlashPlayerVersion()
    if (fv.major > 0) {
      flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release
    } else {
      flashVersion = unknown
    }
  }

  var browserSpecification = {
    Screen: screenSize,
    Browser: browser,
    BrowserVersion: version,
    BrowserMajorVersion: majorVersion,
    Mobile: mobile,
    OsName: os,
    OsVersion: osVersion,
    Cookies: cookieEnabled,
    FlashVersion: flashVersion,
    Device: GetDeviceCategory(),
    ClientFingerPrint: '',
    ua: nAgt,
  }

  return browserSpecification
}

const GetDeviceCategory = () => {
  var deviceType = GetDeviceType()
  //console.log(deviceType);
  if (deviceType.indexOf('mobile') !== -1) return 'Mobile'
  if (deviceType.indexOf('tablet') !== -1) return 'Tablet'
  if (deviceType.indexOf('desktop') !== -1) return 'Desktop'

  return 'Others'
}

const GetDeviceType = () => {
  if (device.ios()) {
    if (device.ipad()) {
      return 'ios ipad tablet'
    } else if (device.iphone()) {
      return 'ios iphone mobile'
    } else if (device.ipod()) {
      return 'ios ipod mobile'
    }
  } else if (device.android()) {
    if (device.androidTablet()) {
      return 'android tablet'
    } else {
      return 'android mobile'
    }
  } else if (device.blackberry()) {
    if (device.blackberryTablet()) {
      return 'blackberry tablet'
    } else {
      return 'blackberry mobile'
    }
  } else if (device.windows()) {
    if (device.windowsTablet()) {
      return 'windows tablet'
    } else if (device.windowsPhone()) {
      return 'windows mobile'
    } else {
      return 'desktop'
    }
  } else if (device.fxos()) {
    if (device.fxosTablet()) {
      return 'fxos tablet'
    } else {
      return 'fxos mobile'
    }
  } else if (device.meego()) {
    return 'meego mobile'
  } else if (device.nodeWebkit()) {
    return 'node-webkit'
  } else if (device.television()) {
    return 'television'
  } else if (device.desktop()) {
    return 'desktop'
  }

  if (device.cordova()) {
    return 'cordova'
  }
  return ''
}
