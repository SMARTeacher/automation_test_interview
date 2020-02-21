## ./game
PoC using "component hooks" for automating game<br>
Run tests `npm run game-e2e-tests`

## Running the tests
Before the first run:<br>
&nbsp;&nbsp;You will need to download and install java jdk<br>
&nbsp;&nbsp;`cd` up to main root and run `make ui-tests`, `cd` back here after completion<br>

#### General Runner Info
General command looks like `AWS_PROFILE='environmentName' OVERRIDE_SETTINGS='fileName' npm run script`<br>
Without `AWS_PROFILE` it uses what ever your default is in the `~/.aws/credentials`<br>
Without `OVERRIDE_SETTINGS` it uses the "pure" base environment<br><br>
If you want to override specific settings:<br>
&nbsp;&nbsp;Copy `template.json` from `./shared/environments`<br>
&nbsp;&nbsp;Delete everything you don't want to override<br>
&nbsp;&nbsp;Change the value of the ones you want to change.<br>

##### E2E Settings
`E2E_MAXINSTANCES` - Sets the max number of parallel browsers
`E2E_SPECS` - Sets the specs to run. Specs should be separated by space (` `)
`E2E_CI` - Sets run to headless, also lowers parallel browsers to `2`

E.G.:<br>
`npm run content-tt-e2e-tests`, runs content testing tool tests against your default aws environment<br>
`AWS_PROFILE=staging npm run game-e2e-tests`, runs game tests against "pure" staging<br>
`AWS_PROFILE=staging OVERRIDE_SETTINGS='local' npm run content-tt-e2e-tests`, runs content testing tool tests with pure staging for backing and `https://www.prodigygame.xyz` for  api's and websites<br>

If you want to point the tests to a QA box:<br>
&nbsp;&nbsp;Duplicate `local.json` from `./shared/environments`<br>
&nbsp;&nbsp;Rename it something memorable<br>
&nbsp;&nbsp;&nbsp;&nbsp;eg. `mudbrays-qa.json`<br>
&nbsp;&nbsp;Change the `BaseUrl` to your boxes url<br>
&nbsp;&nbsp;&nbsp;&nbsp;eg. `{ "BaseUrl": "https://mudbrays-qa.prodigygame.org/" }`<br>
&nbsp;&nbsp;&nbsp;&nbsp;Note: This box is backed by our staging environment<br>
&nbsp;&nbsp;Now use the same command as you would have normally for you backing environment and add `OVERRIDE_SETTINGS=filename`<br>
&nbsp;&nbsp;&nbsp;&nbsp;eg. `AWS_PROFILE=staging OVERRIDE_SETTINGS='mudbrays-qa' npm run game-e2e-tests`
