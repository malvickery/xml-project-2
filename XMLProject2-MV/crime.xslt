<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">

    <xsl:output method="html" indent="yes"/>
    <xsl:param name="province" select="'ON'"/>

    <xsl:template match="/">
                <table class="table table-striped">
                    <thead class="thead-dark">
                    <tr>
                        <th>Crimes in <xsl:value-of select="$province"/></th>
                        <th>Incidents</th>
                        <th>Rate (Incidents/100,000)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <xsl:apply-templates select="//region[@name = $province]"/>
                    </tbody>
                </table>
    </xsl:template>

    <xsl:template match="region">
        <xsl:for-each select="crime">
            <xsl:sort select="@incidents div 100000" order="descending"/>
            <xsl:element name="tr">
                <xsl:element name="td">
                    <xsl:value-of select="@type"/>
                </xsl:element>
                <xsl:element name="td">
                    <xsl:value-of select="@incidents"/>
                </xsl:element>
                <xsl:element name="td">
                    <xsl:value-of select="number(@incidents div ../population-millions div 10)"/>
                </xsl:element>
            </xsl:element>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>
