// Lawrence,Michael
// ML42797
// EE422C-Assignment4

package assignment4;

import java.time.Instant;
import java.util.Arrays;
import java.util.Set;

import java.util.List;
// javac -cp ".:jackson-databind-2.9.2.jar:jackson-annotations-2.9.2.jar:jackson-core-2.9.2.jar" assignment4/*.java 
// java -cp ".:jackson-core-2.9.2.jar:jackson-databind-2.9.2.jar:jackson-annotations-2.9.2.jar" assignment4.Main

public class Main {
    final static String URLEndpoint = "http://kevinstwitterclient2.azurewebsites.net/api/products";

    /**
     * We will not use your Main class to test your code
     * Feel free to modify this as much as you want
     * Here is an example of how you might test the code from main
     * for Problem 1 and Problem 2
     */
    public static void main(String[] args) throws Exception {

        // Problem 1: Returning Tweets from Server
        TweetReader reader = new TweetReader();
        List<Tweets> tweetsList = reader.readTweetsFromWeb(URLEndpoint);
        System.out.println(tweetsList);

        // Problem 2:
        // Filter Tweets by Username
        Filter filter = new Filter();
        List<Tweets> filteredUser = filter.writtenBy(tweetsList,"kevinyee");
        System.out.println(filteredUser);

        // Filter by Timespan
        Instant testStart = Instant.parse("2017-11-11T00:00:00Z");
        Instant testEnd = Instant.parse("2017-11-12T12:00:00Z");
        Timespan timespan = new Timespan(testStart,testEnd);
        List<Tweets> filteredTimeSpan = filter.inTimespan(tweetsList,timespan);
        System.out.println(filteredTimeSpan);

        //Filter by words containinng
        List<Tweets> filteredWords = filter.containing(tweetsList,Arrays.asList("good","luck"));
        System.out.println(filteredWords);

        List<String> names = SocialNetwork.findKMostFollower(tweetsList, 5);
        System.out.println(names);
        List<Set<String>> cliques = SocialNetwork.findCliques(tweetsList);
        System.out.println(cliques);
    }
}