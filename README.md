# SecMaint

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.2.
It is available at https://donhenton.github.io/sec-maint/public_html/. It is also available at https://sec.awsdhenton.com
It is a front-end maintenance application for the service found here: https://github.com/donhenton/spring-boot-birt. This is a fictitious security system with users and applications in security groups.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build. **NOTE: the base tag included in the generated index needs to be adjusted** The command to build is ng build --aot for ahead of time compiling.
Steps are below:

* in one copy of sec-maint for master run ng build --prod --aot this creates a dist folder
* create a folder called sec-maint-staging, one level above the sec-maint copy
* move the dist into  staging and rename it public_html
* in that public_html folder find index.html and rewrite the base tag to &lt;base href=""&gt;
* clone https://github.com/donhenton/sec-maint.git into the staging folder
* at this point, sec-maint-staging should have two folders sec-maint and public html
* cd into sec-maint-staging/sec-maint
* git checkout -t remotes/origin/gh-pages (to checkout existing gh-pages branch)
* __git checkout -b gh-pages__ then __git push --set-upstream origin gh-pages__ to create the gh-pages branch first time
* replace sec-maint-staging/sec-maint/public_html with sec-maint-staging/public_html
* commit and push

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
