# Minimal Site Block

## Introduction

This Add-on provides you with a basic interface to block websites. Since it uses High-Level-APIs from the Firefox Add-on SDK, this Add-on is able to run on a desktop as well as a mobile Firefox.

## Download

You can download this add-on from the [Firefox Add-On page](https://addons.mozilla.org/firefox/addon/minimal-site-block/).

Or you can download the source code and compile the add-on for yourself.

## Develop

This Add-on is only developed using High-Level-APIs. Please refrain from using other or third-party APIs. Before using a new API, please check if it is available on [desktop as well as mobile](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Mobile_development).
Having downloaded the SDK, you can activate it like this:

    source bin/activate

If you want to try this Add-on, try the following commands:

### Desktop

You will need a local [Firefox](https://www.mozilla.org/firefox) installation.

    cfx run

### Mobile

Please make sure adb in your $PATH, otherwise you will have to specify the path. Please use [Firefox Beta](https://play.google.com/store/apps/details?id=org.mozilla.firefox_beta).

    cfx run -a fennec-on-device -b adb --mobile-app firefox_beta --force-mobile

### Building

    cfx xpi --force-mobile

## Licence

This plugin is distributed under the MPL 2.0 Licence.
