/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    //  Test Suite 1
    //  "RSS Feed".
    describe('RSS Feeds', function() {

        //  Test 1.1
        //  It tests to make sure that the allFeeds variable has been defined and that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test 1.2
        // It tests to make sure that has a URL defined and that the URL is not empty.
        it('have defined (url) properties',function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // Test 1.3
        // It tests to make sure that feed.name property exists and the property string length exceeds zero.
        it('have valid (name) properties', function(){

            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined(); 
                expect(feed.name.length).not.toBe(0);
            });

        });
    });

    //  Test Suite 2
    //  "The menu".
    describe("The menu", function(){

    // Test 2.1
    // It tests to make sure that the menu element is hidden by default.
    it("should be hidden by default", function(){
        let body = $("body");
        let menuIsHidden = $(body).hasClass("menu-hidden");
        expect(menuIsHidden).toBe(true);
    });

        // Test 2.2
        // It tests to make sure that the menu changes visibility when the menu icon is clicked.
        it("should toggle visibility when its icon is clicked", function(){
            
            let icon = $(".menu-icon-link").first();
            let body = $("body");
            icon.click();
            let firstClickShowssMenu = !body.hasClass("menu-hidden");
            icon.click();
            let secondClickHidesMenu = body.hasClass("menu-hidden");
            expect(firstClickShowssMenu).toBe(true);
            expect(secondClickHidesMenu).toBe(true);

        });

    });

    // Test 3
    // "Initial Entries".
    describe("Initial Entries", function(){

        // Test 3.1
        // It test to make sure the losdFeed function is complet it is work and there is at least 
        // one entry element within the feed container.
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        it("should be loaded at least (1 entry)", function(done){
            let countOfEntries = $(".feed .entry").length;
            expect(countOfEntries).not.toBe(0);
            done();
        });

    });

    // Test 4
    // "New Feed Selection".
    describe("New Feed Selection", function(){
        
        // Test 4.1
        // It test to that ensures when a new feed is loaded by the loadFeed function that 
        // the content actually changes.
        let tResult = [];  
        let fTestDone = false;  
        let sTestDone = false;

        beforeEach(function(done){
            loadFeed(0, function(){
                
                fTestDone = true;
                tResult.push( $(".feed").html() );

                if(sTestDone) {
                    done();
                }
            });

            loadFeed(1, function(){
                sTestDone = true;
                tResult.push( $(".feed").html() );

                if(fTestDone) {
                    done();
                }
            });
        });

        it("has a different content for different feed url", function(done){
            
            expect(tResult.length).toBe(2);
            expect(tResult[0]).not.toBe(tResult[1]);
            done();    

        });

    });

}());
