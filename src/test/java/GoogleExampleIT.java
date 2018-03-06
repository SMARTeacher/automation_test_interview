/*
 * Requirement:
 * 
 *  1. please fix all the bug in this file 
 *  2. please run it
 *  3. sent your test result and the fixed the file to us
 * 
 * 
 * */


public class GoogleExampleIT 
	{
	private WebDriver driver;
	
	@BeforeMethod
	public void setUp() throws Exception
	{
		driver = new ChromeDriver();
		driver.get("https://www.google.ca/");
	}

	@AfterMethod
	public void tearDown() throws Exception

	{
		driver.quit();
	}

	@Test (enabled = true)
	public void googleCheeseExample() throws Exception

	{
		WebElement searchBar = driver.findElement(By.name("q"));
		searchBar.sendKeys("Cheese!");
		searchBar.submit();
		Assert.assertEquals(driver.getTitle(), "Cheese! - Google Search");
	}
	
	@Test (enabled = true)
	public void googleMilkExample() throws Exception

	{
		WebElement searchBar = driver.findElement(By.name("q"));
		searchBar.sendKeys("Milk!");
		searchBar.submit();
		Assert.assertEquals(driver.getTitle(), "Milk! - Google Search");
	}

}
