# Arlefreak:com

.menu
.social
.nav

# Header
	logo:svg
	menu:ul
		link:li

	Header(
		logo:string,
		menu[]:object{
			name:string,
			link:string,
		}
	)

# Footer
	social:ul
	description:p

	Footer(
		social[]:object{
			name:string,
			link:string,
		}
	)

# Margin
	logo:svg
	sectionID:svg

	Margin(
		logo:string,
		sectionID:string
	)

