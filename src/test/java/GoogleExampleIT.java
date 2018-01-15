import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.util.logging.Logger;

@Test(groups={"localTest"})

public class GoogleExampleIT {
	private static final Logger LOGGER = Logger.getLogger(GoogleExampleIT.class.getName());
	private WebDriver driver;
	private @FindBy(css = "[name='q']") WebElement searchBar;

	// Enters search term followed by ENTER to search. Accepts String 'term' as argument
	private void search(String term) {
		searchBar.clear();
		searchBar.sendKeys(term);
		searchBar.sendKeys(Keys.ENTER);
	}

	@Test(enabled = true)
	public void googleCheeseExample() throws Exception {
		search("Cheese!");
		LOGGER.info("Page title is: " + driver.getTitle());
		Assert.assertTrue(driver.getTitle().equals("Cheese! - Google Search"));
	}

	@Test(enabled = true)
	public void googleMilkExample() throws Exception {
		search("Milk!");
		LOGGER.info("Page title is: " + driver.getTitle());
		Assert.assertTrue(driver.getTitle().equals("Milk! - Google Search"));
	}

	@BeforeMethod
	public void setUp() {
		driver = new FirefoxDriver();
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 60), this);
		driver.get("http://www.google.com");
	}

	@AfterMethod
	public void tearDown() {
		driver.close();
	}
}
